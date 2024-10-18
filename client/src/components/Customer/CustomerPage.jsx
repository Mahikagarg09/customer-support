/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { toast } from "react-toastify";
import { host, addQuery, getQueries } from "../../routes";

const CustomerPage = () => {
  const [message, setMessage] = useState("");
  const [queries, setQueries] = useState([]);

  // Define the socket reference
  const socket = useRef();
  const username = JSON.parse(
    localStorage.getItem("branchInternational")
  ).username;

  // Function to submit the query
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(addQuery, {
        userId: username,
        message: message,
      });
      if (response.data.message === "Query added successfully") {
        socket.current.emit("message", { userId: username, message });
        toast.success("Query submitted successfully");
        setMessage("");
      } else {
        toast.error("Failed to submit query");
      }
    } catch (error) {
      toast.error("Failed to submit query");
    }
  };

  // Function to get all the queries
  const fetchQueries = async () => {
    try {
      const response = await axios.post(getQueries, {
        userId: username,
      });
      setQueries(response.data.queries);
    } catch (error) {
      toast.error("Failed to fetch queries");
    }
  };

  // Fetch all the queries using useEffect and socket.io
  useEffect(() => {
    fetchQueries();
    socket.current = io(host);
    if (socket.current) {
      socket.current.on("message", (msg) => {
        setQueries((queries) => [
          ...queries,
          { message: msg.message, timestamp: Date.now() },
        ]);
      });
    }
    return () => {
      socket.current.disconnect();
    };
  }, []);


  return (
    <div className="px-9 lg:px-64 xl:px-80">
      <div>
        {/* Submit Query */}
        <form className="mt-7" onSubmit={handleSubmit}>
          <h1 className="text-2xl my-5 font-medium">
            Welcome <span className="text-blue-950 text-3xl font-bold">{username}</span>! You can ask your queries here, and we will respond
            to you as soon as possible.
          </h1>
          <div className="flex flex-col gap-5">
            <textarea
              name="query"
              id="query"
              cols="30"
              rows="4"
              className="border-2 border-gray-300 rounded-lg p-3 focus:outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-end my-5">
            <button className="bg-blue-500 px-5 py-2 text-white rounded-lg hover:bg-blue-950 font-medium"
              onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>

        {/* Current Unresolved Queries */}
        <div className="mt-5 p-2">
          <h1 className="text-4xl text-blue-950 my-5 font-bold text-center">
            Your Queries
          </h1>
          <div className="my-12">
            {queries.length === 0 ? (
              <h1 className="text-center text-md font-medium">
                No queries found
              </h1>
            ) : (
              queries.map((query, index) => (
                <div
                  key={index}
                  className="border-2 border-gray-200 rounded-lg p-3 flex justify-between mb-3"
                >
                  <div className="flex items-center gap-8">
                    <img className="w-12 h-12 rounded-full" src="https://cdn-icons-png.flaticon.com/512/3649/3649789.png" alt="" />
                    <div className="font-medium dark:text-white">
                      <div className="text-base text-gray-500 dark:text-gray-400">{query.message}</div>

                    </div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 float-right mt-3">{new Date(query.timestamp).toLocaleString()}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerPage;