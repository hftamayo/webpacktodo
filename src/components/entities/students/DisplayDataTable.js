import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudents, deleteStudent } from "../../store/studentSlice";
import { toast } from "react-toastify";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaSort,
  FaFilePdf,
  FaFileExcel,
} from "react-icons/fa";

import EntityRow from "./EntityRow";
import dataTableClasses from "../../ui/crud/dataTableclasses";

function DisplayDataTable() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
 
  const [selectedId, setSelectedId] = useState(null);
  const [selectedEntityName, setSelectedEntityName] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [currentPageRecords, setCurrentPageRecords] = useState([]);
 
  const [numberOfPages, setNumberOfPages] = useState([]); // [1, 2, 3, 4, 5]
  const totalPages = Math.ceil(students.length / recordsPerPage);
  const pageNumbers = Array.from({ length: numberOfPages }, (_, i) => i + 1);

  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");

  const [confirmDialogBoxOpen, setConfirmDialogBoxOpen] = useState(false);

  const NAVIGATION_BUTTON_CLASSNAME = `${dataTableClasses.navButton} ${
    students.length === 0 || currentPage === 1 || recordsPerPage === -1
      ? "cursor-not-allowed"
      : ""
  }`;

  const loadData = useCallback(() => {
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
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

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

  const handleDeleteEntity = (event) => {
    event.stopPropagation();
    handleDeleteSelectedEntity(selectedId);
    handleResetEntitySelection();
    setConfirmDialogBoxOpen(false);
  };

  const handleResetEntitySelection = () => {
    setSelectedId(null);
    setSelectedEntityName(null);
  };

  const handleDeleteSelectedEntity = (id) => {
    dispatch(deleteStudent(id))
      .then((action) => {
        if (deleteStudent.fulfilled.match(action)) {
          toast.success("Data deleted permanently", {
            className: "bg-black text-yellow-500",
            progressClassName: "bg-blue-600",
          });
          loadData();
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
    setSelectedEntityName(name);
    setConfirmDialogBoxOpen(true);
  };

  const handleCloseConfirmDialogBox = (event) => {
    event.stopPropagation();
    handleResetEntitySelection();
    setConfirmDialogBoxOpen(false);
  };

  const handleSort = (field) => {
    let direction = "asc";
    if (field === sortField) {
      direction = sortDirection === "asc" ? "desc" : "asc";
    }
    setSortField(field);
    setSortDirection(direction);

    const sortedStudents = [...students].sort((a, b) => {
      if (a[field] < b[field]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    //dispatch(getStudents(sortedStudents));
    setCurrentPageRecords(
      sortedStudents.slice(
        (currentPage - 1) * recordsPerPage,
        currentPage * recordsPerPage
      )
    );
  };

  const handleSearch = (searchCriteria) => {
    const lowerCaseSearchCriteria = searchCriteria.toLowerCase();

    const filteredStudents = students.filter((student) =>
      Object.values(student).some((value) =>
        value.toString().toLowerCase().includes(lowerCaseSearchCriteria)
      )
    );

    setCurrentPageRecords(
      filteredStudents.slice(
        (currentPage - 1) * recordsPerPage,
        currentPage * recordsPerPage
      )
    );
  };

  const exportToExcel = () => {
    // Convert the data to JSON
    const jsonData = JSON.stringify(currentPageRecords, null, 2);
    console.log("data to the PDF report: ", jsonData);

    // Send the data to the backend
    // fetch("/api/exportToPdf", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: jsonData,
    // })
    //   .then((response) => response.blob())
    //   .then((blob) => {
    //     // Create a link element and trigger a download
    //     const url = window.URL.createObjectURL(blob);
    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.setAttribute("download", "students.pdf");
    //     document.body.appendChild(link);
    //     link.click();
    //     link.remove();
    //   })
    //   .catch((error) => console.error("Error:", error));
  };

  const exportToPdf = () => {
    const jsonData = JSON.stringify(currentPageRecords, null, 2);
    console.log("data to the PDF report: ", jsonData);
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
            onChange={(event) => handleSearch(event.target.value)}
            disabled={students.length === 0}
            className="flex-grow text-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
          />
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
          Records Per Page:{" "}
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
        <div className="border-gray-100 my-4 px-24"></div>

        <div className="flex flex-grow">
          Export to:{" "}
          <button onClick={() => exportToPdf()} className="px-1">
            <FaFilePdf size={24} color="red" />
          </button>
          <button onClick={() => exportToExcel()} className="px-1">
            <FaFileExcel size={24} color="green" />
          </button>
        </div>
      </div>

      <table className="w-[95%] text-center overflow-hidden overflow-y-scroll mt-8 border-2 border-b-2 border-black">
        <thead className="border-b bg-gray-800">
          <tr>
            <th
              scope="col"
              className={`${dataTableClasses.columnHeader} flex items-center`}
            >
              ID{" "}
              <button
                onClick={() => handleSort("id")}
                className="px-2"
                title="Sort by ID"
              >
                <FaSort />
              </button>
            </th>
            <th scope="col" className={dataTableClasses.columnHeader}>
              Name{" "}
              <button
                onClick={() => handleSort("name")}
                className="px-2"
                title="Sort by Name"
              >
                <FaSort />
              </button>
            </th>
            <th className={dataTableClasses.columnHeader}>Email</th>
            <th className={dataTableClasses.columnHeader}>Phone</th>
            <th className={dataTableClasses.columnHeader}>Address</th>
            <th className={dataTableClasses.columnHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPageRecords.length > 0 ? (
            currentPageRecords.map((data) => (
              <EntityRow
                key={data.id}
                entity={data}
                selectedEntityName={selectedEntityName}
                confirmDialogBoxOpen={confirmDialogBoxOpen}
                handleDeleteEntity={handleDeleteEntity}
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
          <select
            value={currentPage}
            onChange={(e) => setCurrentPage(Number(e.target.value))}
            className="px-3 py-0 bg-gray-800 text-white rounded-md"
          >
            {pageNumbers.map((number) => (
              <option
                key={number}
                value={number}
                disabled={recordsPerPage === -1}
              >
                {number}
              </option>
            ))}
          </select>
          <div className="border-gray-200 my-4 px-1"></div>
        </div>
      </nav>
    </div>
  );
}

export default DisplayDataTable;
