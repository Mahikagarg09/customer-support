import { useState } from "react";

const AdminPage = () => {
  // Static data for queries
  const [queries] = useState([
    {
      message: "How can I reset my password?",
      userId: "john_doe",
      timestamp: "10/17/2024, 11:00 AM",
    },
    {
      message: "I haven't received my order yet.",
      userId: "jane_smith",
      timestamp: "10/16/2024, 9:30 AM",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Filter queries based on search term
  const filteredQueries = queries.filter(
    (query) =>
      query.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <button className="py-2 px-4 mt-2 bg-blue-500 text-white rounded-lg">
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
                  <div className="text-xs text-gray-500 dark:text-gray-400 float-right mt-3">{new Date(query.timestamp).toLocaleString()}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-2 text-center text-xl mt-5">No queries found</p>
        )}
      </div>
    </>
  );
};

export default AdminPage;
