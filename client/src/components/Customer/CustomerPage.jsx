import React from "react";

const CustomerPage = () => {
  return (
    <div className="px-9">
      <div className="md:grid md:grid-cols-2 gap-20">
        {/* Submit Query */}
        <form className="mt-7">
          <h1 className="text-lg my-5 font-medium">
            Welcome Customer! You can ask your queries here and we will respond
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
            ></textarea>
          </div>
          <div className="flex justify-end my-5">
            <button className="bg-purple-600 px-5 py-2 text-white rounded-lg hover:bg-purple-500 font-medium">
              Submit
            </button>
          </div>
        </form>

        {/* Past Queries */}
        <div className="mt-7">
          <h1 className="text-lg my-5 font-medium text-center">
            Your Past Queries
          </h1>
          <div className="my-12">
            <h1 className="text-center text-md font-medium">
              No queries found
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
