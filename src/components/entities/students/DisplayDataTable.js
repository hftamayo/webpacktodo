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
  const [currentPageRecords, setCurrentPageRecords] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState([]); // [1, 2, 3, 4, 5]

  const totalPages = Math.ceil(students.length / recordsPerPage);
  const pageNumbers = Array.from({ length: numberOfPages }, (_, i) => i + 1);

  const [selectedId, setSelectedId] = useState(null);
  const [selectedStudentName, setSelectedStudentName] = useState(null);
  const [confirmDialogBoxOpen, setConfirmDialogBoxOpen] = useState(false);

  const ENTITY_HEADER_CLASSNAME = "text-sm font-medium text-white px-6 py-4";
  const NAVIGATION_BUTTON_CLASSNAME = `p-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md ${
    students.length === 0 || currentPage === 1 || recordsPerPage === -1
      ? "cursor-not-allowed"
      : ""
  }`;

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

  useEffect(() => {
    let pages;
    let currentPageRecords;

    if (recordsPerPage === -1) {
      pages = 1;
      currentPageRecords = students;
    } else {
      pages = Math.ceil(students.length / recordsPerPage);
      currentPageRecords = students.slice(
        (currentPage - 1) * recordsPerPage,
        currentPage * recordsPerPage
      );
    }
    setNumberOfPages(pages);
    setCurrentPageRecords(pages === 0 ? [] : currentPageRecords);
  }, [students, currentPage, recordsPerPage]);

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
            Search Criteria:
          </label>
          <div className="border-gray-200 my-4 px-1"></div>
          <input
            type="text"
            id="searchCriteria"
            name="searchCriteria"
            onChange={(event) => console.log(event.target.value)}
            disabled={students.length === 0}
            className="flex-grow text-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
          />
          <div className="border-gray-200 my-4 px-1"></div>
          <button
            disabled={students.length === 0}
            className="px-4 py-2 text-base font-medium text-white bg-sky-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Search
          </button>
        </div>
        <div className="border-gray-100 my-4 px-24"></div>
        <div className="flex-grow text-center">
          Displaying:{" "}
          <span className="font-semibold">
            {currentPageRecords.length} of {students.length}
          </span>
        </div>
        <div className="border-gray-100 my-4 px-24"></div>

        <div className="flex-shrink-0">
          Records Per Page:
          <select
            className="px-3 py-1 bg-gray-800 text-white rounded-md"
            value={recordsPerPage}
            onChange={(event) => setRecordsPerPage(event.target.value)}
            disabled={students.length === 0}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="-1">All</option>
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
          {currentPageRecords.length > 0 ? (
            currentPageRecords.map((data) => (
              <EntityRow
                key={data.id}
                entity={data}
                selectedStudentName={selectedStudentName}
                confirmDialogBoxOpen={confirmDialogBoxOpen}
                handleDeleteStudent={handleDeleteStudent}
                handleOpenConfirmDialogBox={handleOpenConfirmDialogBox}
                handleCloseConfirmDialogBox={handleCloseConfirmDialogBox}
              />
            ))
          ) : (
            <tr>
              <td colSpan="6">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
      <nav className="flex items-center justify-between pt-4">
        <div className="flex items-center justify-center">
          <button
            className={NAVIGATION_BUTTON_CLASSNAME}
            disabled={
              students.length === 0 ||
              currentPage === 1 ||
              recordsPerPage === -1
            }
            onClick={() => setCurrentPage(1)}
          >
            <FaAngleDoubleLeft className="h-5 w-5" />
          </button>
          <div className="border-t border-gray-200 my-4 px-1"></div>
          <button
            className={NAVIGATION_BUTTON_CLASSNAME}
            disabled={
              students.length === 0 ||
              currentPage === 1 ||
              recordsPerPage === -1
            }
            onClick={() => setCurrentPage((old) => Math.max(old - 1, 1))}
          >
            <FaAngleLeft className="h-5 w-5" />
          </button>
          <div className="border-gray-200 my-4 px-1"></div>
          <button
            className={NAVIGATION_BUTTON_CLASSNAME}
            disabled={
              students.length === 0 ||
              currentPage === totalPages ||
              recordsPerPage === -1
            }
            onClick={() =>
              setCurrentPage((old) => Math.min(old + 1, totalPages))
            }
          >
            <FaAngleRight className="h-5 w-5" />
          </button>
          <div className="border-t border-gray-200 my-4 px-1"></div>
          <button
            className={NAVIGATION_BUTTON_CLASSNAME}
            disabled={
              students.length === 0 ||
              currentPage === totalPages ||
              recordsPerPage === -1
            }
            onClick={() => setCurrentPage(totalPages)}
          >
            <FaAngleDoubleRight className="h-5 w-5" />
          </button>
        </div>
        <div className="flex items-center">
          <div className="border-gray-200 my-4 px-1"></div>
          Go To Page:
          <div className="border-gray-200 my-4 px-1"></div>
          <span className="px-3 py-0 bg-gray-800 text-white rounded-md flex items-center justify-center align-middle">
            {pageNumbers.map((number) => (
              <button
                key={number}
                disabled={recordsPerPage === -1}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </button>
            ))}
          </span>
          <div className="border-gray-200 my-4 px-1"></div>
        </div>
      </nav>
    </div>
  );
}

export default DisplayDataTable;
