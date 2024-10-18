import { useState, useEffect} from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { host, addQuery, getCurrentCustomerQueries } from "../../routes"
import ChatModal from "../Chat";

const socket = io(host);

const CustomerPage = () => {

  const id = JSON.parse(
    localStorage.getItem("branchInternational")
  )._id;
  // State for the query input and past queries
  const [currentQuery, setCurrentQuery] = useState('');
  const [pastQueries, setPastQueries] = useState([]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedQueryId, setSelectedQueryId] = useState(null);

  const handleOpenModal = (queryId) => {
    setSelectedQueryId(queryId); // Set the query ID
    setModalOpen(true); // Open the modal
  };

  // Fetch past queries on component mount
  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const response = await axios.post(getCurrentCustomerQueries, {
          userId: `${id}` // Replace with the actual user ID
        });
        setPastQueries(response.data.queries || []);
        console.log(pastQueries)
      } catch (error) {
        console.error("Error fetching past queries:", error);
        toast.error("Failed to load past queries.");
      }
    };

    fetchQueries();

    // Listen for new messages from Socket.io
    socket.on('message', (data) => {
      setPastQueries((prevQueries) => [...prevQueries, { message: data.message, timestamp: new Date() }]);
    });

    return () => {
      socket.off('message'); // Clean up the listener
    };
  }, [id, pastQueries]);

  // Handle query submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentQuery) {
      toast.warn("Please enter a query before submitting.");
      return;
    }

    try {
      const response = await axios.post(addQuery, {
        userId: `${id}`, // Replace with the actual user ID
        sender: `${id}`,
        message: currentQuery,
      });

      if (response.data.message === 'Message saved successfully') {
        // Emit the message through Socket.io
        socket.emit('message', { userId: `${id}`, message: currentQuery });

        // Clear the input field
        setCurrentQuery('');
        toast.success("Your query has been submitted successfully!");
        // Optionally, refresh past queries
        // fetchQueries();
      } else {
        toast.error("Error saving the query: " + response.data.message);
      }
    } catch (error) {
      console.error("Error submitting the query:", error);
      toast.error("Failed to submit your query.");
    }
  };

  return (
    <div className="px-9 lg:px-64 xl:px-80">
      <ToastContainer /> {/* Toast container for notifications */}
      <div>
        {/* Submit Query */}
        <form className="mt-7" onSubmit={handleSubmit}>
          <h1 className="text-xl my-5 font-medium">
            Welcome Customer! You can ask your queries here, and we will respond
            to you as soon as possible.
          </h1>
          <div className="flex flex-col gap-5">
            <textarea
              name="query"
              id="query"
              cols="30"
              rows="5"
              className="border-2 border-gray-300 rounded-lg p-3 focus:outline-none"
              placeholder="Type your query here..."
              value={currentQuery}
              onChange={(e) => setCurrentQuery(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-end my-5">
            <button type="submit" className="bg-blue-500 px-5 py-2 text-white rounded-lg hover:bg-blue-950 font-medium">
              Submit
            </button>
          </div>
        </form>

        {/* Past Queries */}
        <div className="mt-7 p-2">
          <h1 className="text-xl my-5 font-medium text-center">
            Your Past Queries
          </h1>
          <div className="my-12">
            {pastQueries.length === 0 ? (
              <h1 className="text-center text-md font-medium">
                No queries found
              </h1>
            ) : (
              pastQueries.map((query, index) => (
                <div
                  key={index}
                  className="border-2 border-gray-200 rounded-lg p-3 flex justify-between mb-3 cursor-pointer"
                  onClick={() => handleOpenModal(query._id)}
                >
                  <div className="flex items-center gap-8">
                    <img className="w-12 h-12 rounded-full" src="https://cdn-icons-png.flaticon.com/512/3649/3649789.png" alt="" />
                    <div className="font-medium dark:text-white">
                      <div className="text-base text-gray-500 dark:text-gray-400">{query?.messages[0]?.message}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 float-right mt-3">{new Date(query.timestamp).toLocaleString()}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <ChatModal
        isOpen={isModalOpen}
        setModalOpen={setModalOpen}
        onClose={() => setModalOpen(false)} // Close the modal
        queryId={selectedQueryId} // Pass the selected query ID
      />
    </div>
  );
};

export default CustomerPage;