import React from "react";

const AdminPage = () => {
  return (
    <>
      <div className="w-[90vw] lg:w-[50vw] mx-auto">
        <input
          type="text"
          className="w-[90vw] lg:w-[50vw] mx-auto py-2 px-4 mt-9
      border-2 border-gray-200 rounded-lg focus:outline-none"
          placeholder="Search Queries"
        />
        <div className="flex justify-end">
          <button className="py-2 px-4 mt-2 bg-purple-500 text-white rounded-lg">
            Get Slots
          </button>
        </div>
      </div>
      <div className="lg:w-[50vw] mx-auto mt-7 md:grid md:grid-cols-2">
        <p className="col-span-2 text-center text-xl mt-5">
          No queries found
        </p>
      </div>
    </>
  );
};

export default AdminPage;
