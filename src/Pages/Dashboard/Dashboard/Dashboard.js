import React from "react";
import useTitle from "../../../hooks/useTitle";

const Dashboard = () => {
  useTitle("Dashboard");
  return (
    <div className="mx-5 flex justify-center items-center text-blue-600 h-1/2">
      <h1 className="text-6xl font-thin">Welc</h1>
      <div className="w-9 h-9 border-8 border-dashed rounded-full animate-spin border-blue-600 mt-5"></div>
      <h1 className="text-6xl font-thin">lme to Dashboard</h1>
    </div>
  );
};

export default Dashboard;
