import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { getCurrentCustomerQueries, host } from "../../routes";
import { io } from "socket.io-client";
import { toast } from "react-toastify";

const Queries = () => {
    // Define the state variables
    const [queries, setQueries] = useState([]);

    // Get the username from the local storage
    const username = JSON.parse(
        localStorage.getItem("branchInternational")
    ).username;

    // Define the socket reference
    const socket = useRef();

    // Define the function to fetch the queries
    const fetchQueries = async () => {
        try {
            const response = await axios.post(getCurrentCustomerQueries, {
                userId: username,
            });
            setQueries(response.data.queries);
        } catch {
            toast.error("Failed to fetch queries");
        }
    };

    // Define the function to update the queries
    const updateQueries = (queries, msg) => {
        const objIndex = queries.findIndex((val) => val._id === msg.queryId);
        console.log(objIndex);
        const updatedQueries = [...queries];
        updatedQueries[objIndex].resolved = msg.solution;
        return updatedQueries;
    };

    // Fetch the queries and connect to the socket
    useEffect(() => {
        fetchQueries();
        socket.current = io(host);
        if (socket.current) {
            socket.current.on("resolve", (msg) => {
                setQueries((queries) => [...updateQueries(queries, msg)]);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="p-4">
            <div className="text-5xl text-center font-extrabold text-blue-950">Resolved Queries</div>
            <h1 className="text-xl text-center font-medium text-gray-900 mt-10 mb-5">
                Hi {username}, your queries are resolved by our team
            </h1>
            {queries.length === 0 && (
                <h1 className="text-xl text-center font-medium text-gray-900 mt-10 mb-5">
                    No queries resolved yet
                </h1>
            )}
            <div className="w-[80vw] mx-auto my-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
                    {queries.map((query, index) => (
                        <div className="relative" key={index}>
                            <button className="absolute py-1 px-3 -left-8 -top-2 -rotate-[10deg] border border-black bg-blue-950 text-white font-bold">
                                QUERY-{index + 1}
                            </button>

                            <div className="w-full text-left p-8 border border-black rounded-lg shadow-md bg-gray-100">
                                <p className="text-md text-gray-800 font-bold text-left leading-normal mb-5 font-lf-normal">
                                    {query.message}
                                </p>
                                <p className="text-md text-gray-800 text-left leading-normal mb-5 font-lf-normal">
                                    {query.resolved}
                                </p>
                                <span className="flex items-end justify-end ">
                                    <img
                                        alt="logo"
                                        className="h-10 w-10 rounded-md mr-3 "
                                        src="https://cdn-icons-png.flaticon.com/512/10342/10342464.png"
                                    />
                                    <div>
                                        <p className="text-sm text-gray-600">{query.requested}</p>
                                        <p className="text-sm text-gray-400">
                                            {new Date(query.timestamp).toLocaleDateString() + " " + new Date(query.timestamp).toLocaleTimeString()}
                                        </p>
                                    </div>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Queries;
