import React from "react";
import DisplayDataTable from "./DisplayDataTable";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function ViewStudents() {
  return (
    <div className="w-full h-full flex flex-col px-10 py-8 justify-center items-start">
      <div>
        <Link
          to={`/newstudent`}
          className="px-6 py-2 font-normal text-white bg-green-600 rounded-lg"
        >
          Add
        </Link>
      </div>

      <DisplayDataTable />
    </div>
  );
}

export default ViewStudents;
