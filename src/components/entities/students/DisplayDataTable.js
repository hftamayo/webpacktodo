import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudents, deleteStudent } from "../../store/studentSlice";
import { toast } from "react-toastify";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";

import EntityRow from "./EntityRow";

function DisplayDataTable() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = students.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(students.length / recordsPerPage);
  const numberOfPages = [...Array(totalPages + 1).keys()].slice(1);

  const [selectedId, setSelectedId] = useState(null);
  const [selectedStudentName, setSelectedStudentName] = useState(null);
  const [confirmDialogBoxOpen, setConfirmDialogBoxOpen] = useState(false);

  const ENTITY_HEADER_CLASSNAME = "text-sm font-medium text-white px-6 py-4";

  const loadStudents = () => {
    try {
      dispatch(getStudents()).then((action) => {
        if (getStudents.fulfilled.match(action)) {
          console.log("Status: succeeded"); // Log the status
        } else if (getStudents.rejected.match(action)) {
          console.log("Status: failed"); // Log the status
        }
      });
    } catch (error) {
      toast.error(
        "An error occurred while trying to load the data, the event was reported. Please try again later."
      );
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleDeleteStudent = (event) => {
    event.stopPropagation();
    handleDeleteSelectedStudent(selectedId);
    handleResetEntitySelection();
    setConfirmDialogBoxOpen(false);
  };

  const handleResetEntitySelection = () => {
    setSelectedId(null);
    setSelectedStudentName(null);
  };

  const handleDeleteSelectedStudent = (id) => {
    dispatch(deleteStudent(id))
      .then((action) => {
        if (deleteStudent.fulfilled.match(action)) {
          toast.success("Data deleted permanently", {
            className: "bg-black text-yellow-500",
            progressClassName: "bg-blue-600",
          });
          loadStudents();
        } else if (deleteStudent.rejected.match(action)) {
          console.log("deleteStudent action rejected");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          "An error occurred while trying to delete the selected data, the event was reported. Please try again later. "
        );
      });
  };

  const handleOpenConfirmDialogBox = (id, name) => {
    setSelectedId(id);
    setSelectedStudentName(name);
    setConfirmDialogBoxOpen(true);
  };

  const handleCloseConfirmDialogBox = (event) => {
    event.stopPropagation();
    handleResetEntitySelection();
    setConfirmDialogBoxOpen(false);
  };

  return (
    <div className="w-full flex flex-col min-h-[50vh] justify-center items-center">
      <h1 className="text-black text-3xl font-semibold font-Montserrat">
        Students Catalog
      </h1>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <label
            htmlFor="searchCriteria"
            className="mr-2 block text-md font-medium text-gray-700"
          >
            Search Criteria
          </label>
          <input
            type="text"
            id="searchCriteria"
            name="searchCriteria"
            onChange={(event) => console.log(event.target.value)}
            className="flex-grow text-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
          />
        </div>

        <div className="flex-grow text-center">
          Total records:{" "}
          <span className="font-semibold">{students.length}</span>
        </div>

        <div className="flex-shrink-0">
          Records visible:
          <select
            className="px-3 py-1 bg-gray-800 text-white rounded-md"
            value={recordsPerPage}
            onChange={(event) => setRecordsPerPage(event.target.value)}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">20</option>
          </select>
        </div>
      </div>

      <table className="w-[95%] text-center overflow-hidden overflow-y-scroll mt-8 border-2 border-b-2 border-black">
        <thead className="border-b bg-gray-800">
          <tr>
            <th scope="col" className={ENTITY_HEADER_CLASSNAME}>
              #
            </th>
            <th className={ENTITY_HEADER_CLASSNAME}>Name</th>
            <th className={ENTITY_HEADER_CLASSNAME}>Email</th>
            <th className={ENTITY_HEADER_CLASSNAME}>Phone</th>
            <th className={ENTITY_HEADER_CLASSNAME}>Address</th>
            <th className={ENTITY_HEADER_CLASSNAME}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((data) => (
            <EntityRow
              key={data.id}
              entity={data}
              selectedStudentName={selectedStudentName}
              confirmDialogBoxOpen={confirmDialogBoxOpen}
              handleDeleteStudent={handleDeleteStudent}
              handleOpenConfirmDialogBox={handleOpenConfirmDialogBox}
              handleCloseConfirmDialogBox={handleCloseConfirmDialogBox}
            />
          ))}
        </tbody>
      </table>
      <nav className="flex items-center justify-between pt-4">
        <div className="flex items-center justify-center">
          <button
            className="p-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <FaAngleDoubleLeft className="h-5 w-5" />
          </button>
          <div className="border-t border-gray-200 my-4 px-1"></div>
          <button
            className="p-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <FaAngleLeft className="h-5 w-5" />
          </button>
          <div className="border-t border-gray-200 my-4 px-1"></div>
          Page:
          <span className="px-3 py-1 bg-gray-800 text-white rounded-md">
            <select
              className="px-3 py-1 bg-gray-800 text-white rounded-md"
              value={currentPage}
              onChange={(event) => setCurrentPage(event.target.value)}
            >
              {numberOfPages.map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
          </span>
          <div className="border-t border-gray-200 my-4 px-1"></div>
          <button
            className="p-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <FaAngleRight className="h-5 w-5" />
          </button>
          <div className="border-t border-gray-200 my-4 px-1"></div>
          <button
            className="p-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <FaAngleDoubleRight className="h-5 w-5" />
          </button>
        </div>
      </nav>
    </div>
  );
}

export default DisplayDataTable;
