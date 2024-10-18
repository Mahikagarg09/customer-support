/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import { getQueries, host, getSlots } from "../../routes";
import { toast } from "react-toastify";

const AdminPage = () => {
  // Static data for queries
  const username = JSON.parse(
    localStorage.getItem("branchInternational")
  ).username;

  const navigate = useNavigate();

  // Define the state variables
  const [queries, setQueries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const socket = useRef();

  // Function to get all the queries
  const fetchQueries = async () => {
    try {
      const response = await axios.post(getQueries, {
        userId: "",
      });
      setQueries(response.data.queries);
    } catch (error) {
      toast.error("Failed to fetch queries");
    }
  };

  // Initialize socket connection and listen for new messages
  useEffect(() => {
    fetchQueries();
    socket.current = io(host);
    socket.current.on("message", (msg) => {
      setQueries((prevQueries) => [
        ...prevQueries,
        { message: msg.message, userId: msg.userId, timestamp: Date.now() },
      ]);
    });
    return () => {
      socket.current.disconnect();
    };
  }, []);

  // Filter queries based on search term (both username and message)
  const filteredQueries = queries.filter(
    (query) =>
      query.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle get slots button click
  const getSlots = async () => {
    try {
      const ids = queries.slice(0, 5).map((query) => query._id);
      await axios.post(getSlots, {
        userId: username,
        ids,
      });
      navigate("/toResolve");
      toast.success("Queries assigned successfully");
    } catch (error) {
      toast.error("Failed to assign queries");
    }
  };
  
  return (
    <>
      <div className="w-[90vw] lg:w-[50vw] mx-auto">
        <input
          type="text"
          className="w-[90vw] lg:w-[50vw] mx-auto py-2 px-4 mt-9
      border-2 border-gray-200 rounded-lg focus:outline-none"
          placeholder="Search Queries"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex justify-end">
          <button className="py-2 px-4 mt-2 bg-blue-500 text-white rounded-lg" onClick={getSlots}>
            Get Slots
          </button>
        </div>
      </div>
      <div className="lg:w-[50vw] mx-auto mt-7 md:grid md:grid-cols-2">
        {filteredQueries.length > 0 ? (
          filteredQueries.map((query, index) => (
            <div
              key={index}
              className="border-2 border-gray-200 p-4 m-4 rounded-lg"
            >
              <div className="flex items-center gap-8">
                <img className="w-12 h-12 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ41A81cAVOwJ6e58SZMxg_Fh-VSwnYIWb3Bw&s" alt="" />
                <div className="font-medium dark:text-white">
                  <div className="text-blue-950 text-xl">{query.userId}</div>
                  <div className="text-base text-gray-500 dark:text-gray-400">{query.message}</div>
                </div>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 float-right mt-3">{new Date(query.timestamp).toLocaleString()}</div>
            </div>
          ))
        ) : (
          <p className="col-span-2 text-center text-xl mt-5">No queries found</p>
        )}
      </div>
    </>
  )
};

export default AdminPage;