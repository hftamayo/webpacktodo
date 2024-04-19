import React from "react";
import DataTable from "./data/DataTable";


function ViewStudents() {
  return (
    <div className="w-full h-full flex flex-col px-10 py-8 justify-center items-start">
      <DataTable />
    </div>
  );
}

export default ViewStudents;
