import React from "react";
import DisplayDataTable from "./DisplayDataTable";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

function ViewStudents() {
  return (
    <div className="w-full h-full flex flex-col px-10 py-8 justify-center items-start">
      <div>
        <Link
          to={`/newstudent`}
          className="flex items-center px-6 py-2 font-normal text-white bg-green-600 rounded-lg w-30"
        >
          <FaPlus />
          <span className="ml-2">New</span>
        </Link>
      </div>

      <DisplayDataTable />
    </div>
  );
}

export default ViewStudents;
