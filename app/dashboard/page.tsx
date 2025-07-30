import React from "react";

const DashBoard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white  rounded-xl p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome!</h1>
        <p className="text-gray-600 text-sm">
          You're now logged in to your dashboard.
        </p>
      </div>
    </div>
  );
};

export default DashBoard;
