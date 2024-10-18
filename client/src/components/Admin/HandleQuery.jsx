/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { getAdminQueries, resolveQuery, host } from "../../routes";
import { toast } from "react-toastify";

const HandleQuery = () => {
  // Define the state variables
  const socket = useRef();

  // Get the username from the local storage
  const username = JSON.parse(
    localStorage.getItem("branchInternational")
  ).username;

  // Define the state variables
  const [queries, setQueries] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [solution, setSolution] = useState("");

  // Fetch queries
  const fetchQueries = async () => {
    try {
      const response = await axios.post(getAdminQueries, {
        userId: username,
      });
      setQueries(response.data.queries);
    } catch (error) {
      toast.error("Failed to fetch queries");
    }
  };

  // Handle resolve button click
  const handleResolveClick = (queryId) => {
    setSelectedQuery(queryId);
  };

  // Function to send solution
  const sendSolution = async () => {
    try {
      const response = await axios.post(resolveQuery, {
        queryId: selectedQuery,
        solution,
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        setSelectedQuery(null);
        setSolution("");
        fetchQueries();
      } else {
        toast.error("Failed to resolve query");
      }
    } catch (error) {
      toast.error("Failed to resolve query");
    }
  };

  // Function to filter queries
  const filterQueries = (queries, queryId) => {
    return queries.filter((query) => query._id !== query);
  };

  // Use effect to fetch queries and connect to socket
  useEffect(() => {
    fetchQueries();
    socket.current = io(host);
    socket.current.on("resolve", (msg) => {
      setQueries((prev) => [...filterQueries(prev, msg)]);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 className="text-center text-xl font-medium mt-4">Resolve Queries</h1>
      <div className="w-[60vw] mx-auto my-9">
        {queries.length > 0 ? (
          queries.map((query) => (
            <div key={query._id} className="border-2 mt-3 rounded-lg py-3 px-5">
              <h3 className="font-bold">Query: {query.message}</h3>
              <div className="flex justify-between mt-3">
                <p className="text-gray-400 font-medium">
                  Customer: {query.userId}
                </p>
                {!(selectedQuery === query._id) && (
                  <button
                    className="bg-purple-500 text-white px-3 py-1 rounded-lg"
                    onClick={() => handleResolveClick(query._id)}
                  >
                    Resolve
                  </button>
                )}
              </div>
              {selectedQuery === query._id && (
                <div className="flex space-x-3">
                  <input
                    type="text"
                    placeholder="Enter your response"
                    value={solution}
                    className="border-2 mt-5 rounded-lg px-3 py-1 focus:outline-none w-full"
                    onChange={(e) => setSolution(e.target.value)}
                  />
                  <button
                    className="bg-purple-500 text-white px-3 py-1 rounded-lg mt-4"
                    onClick={sendSolution}
                  >
                    Send
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center font-medium text-xl mt-5 text-purple-600">
            No Queries to Resolve
          </p>
        )}
      </div>
    </>
  );
};

export default HandleQuery;
