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
    const [textareaHeight, setTextareaHeight] = useState('40px');
    const textareaRef = useRef(null);

    // Function to adjust the height of the textarea
    const handleTextareaChange = (e) => {
        setSolution(e.target.value);
        setTextareaHeight("auto");  // Reset height to auto before calculating scroll height
        setTextareaHeight(`${textareaRef.current.scrollHeight}px`);
    };

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
            <div className="text-5xl text-center font-extrabold text-blue-950 mt-5">Handle Queries</div>
            <div className="w-[60vw] mx-auto my-9">
                {queries.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
                        {queries.map((query) => (
                            <div key={query._id} className="py-3 px-5 transition-all duration-500 bg-white border border-indigo-100 rounded-lg shadow hover:shadow-xl">
                                <div
                                    className="flex items-start justify-start p-6   lg:p-2 lg:flex-row lg:space-y-0 lg:space-x-6">
                                    <div
                                        className="flex justify-start items-center ">
                                        <img className="w-12 h-12 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ41A81cAVOwJ6e58SZMxg_Fh-VSwnYIWb3Bw&s" alt="" />
                                    </div>
                                    <div className="ml-3 mt-4">
                                        <h5 className="text-xl font-bold lg:text-2xl">{query.userId}</h5>
                                    </div>
                                </div>
                                <p className="mb-6 text-lg text-gray-600 mt-4">Query: {query.message}</p>
                                {!(selectedQuery === query._id) && (
                                    <button
                                        className="flex items-center justify-center w-full  text-lg font-bold text-white bg-blue-900 hover:bg-blue-500 p-2 text-center rounded-lg"
                                        onClick={() => handleResolveClick(query._id)}
                                    >
                                        Handle Query
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    </button>
                                )}
                                {selectedQuery === query._id && (
                                    <div>
                                        <textarea
                                            ref={textareaRef}
                                            value={solution}
                                            onChange={handleTextareaChange}
                                            placeholder="Enter your response"
                                            className="border-2 mt-1 rounded-lg px-3 py-1 focus:outline-none w-full"
                                            style={{
                                                height: textareaHeight,  // Dynamically set the height
                                                overflowY: "hidden",     // Hide the scrollbar
                                            }}
                                        />
                                        <button
                                            className="text-white bg-blue-900 hover:bg-blue-500 px-3 py-1 rounded-lg mt-4"
                                            onClick={sendSolution}
                                        >
                                            Send
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
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
