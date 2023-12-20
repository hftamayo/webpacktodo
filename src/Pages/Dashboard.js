import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const showStudents = () => {
    navigate("/students");
  };

  return (
    <div className="w-full h-full flex flex-col px-10 py-8">
      <button
        className="w-48 bg-black text-blue-400 font-semibold text-xl h-12 rounded-lg"
        onClick={showStudents}
      >
        Students
      </button>
    </div>
  );
}

export default Dashboard;
