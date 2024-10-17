import React from "react";

const CustomerPage = () => {
  // Static data for past queries
  const pastQueries = [
    { message: "How can I change my password?", timestamp: "10/17/2024, 10:15 AM" },
    { message: "When will my order be delivered?", timestamp: "10/16/2024, 2:45 PM" },
  ];

  return (
    <div className="px-9">
      <div className="md:grid md:grid-cols-2 gap-20">
        {/* Submit Query */}
        <form className="mt-7">
          <h1 className="text-xl my-5 font-medium">
            Welcome Customer! You can ask your queries here, and we will respond
            to you as soon as possible.
          </h1>
          <div className="flex flex-col gap-5">
            <textarea
              name="query"
              id="query"
              cols="30"
              rows="10"
              className="border-2 border-gray-300 rounded-lg p-3 focus:outline-none"
              placeholder="Type your query here..."
              value="This is a static query."
              readOnly
            ></textarea>
          </div>
          <div className="flex justify-end my-5">
            <button className="bg-blue-500 px-5 py-2 text-white rounded-lg hover:bg-blue-950 font-medium">
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
                  className="border-2 border-gray-200 rounded-lg p-3 flex justify-between mb-3"
                >
                  {/* <p className="text-md">{query.message}</p>
                  <p className="text-xs text-white">{query.timestamp}</p> */}
                  <div class="flex items-center gap-8">
                    <img class="w-12 h-12 rounded-full" src="https://cdn-icons-png.flaticon.com/512/3649/3649789.png" alt="" />
                    <div class="font-medium dark:text-white">
                      <div class="text-base text-gray-500 dark:text-gray-400">{query.message}</div>
                      
                    </div>
                  </div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 float-right mt-3">{new Date(query.timestamp).toLocaleString()}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
