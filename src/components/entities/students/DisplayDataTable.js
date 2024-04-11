import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudents } from "../../store/studentSlice";
import { toast } from "react-toastify";
import { FaSort } from "react-icons/fa";

import EntityRow from "./EntityRow";
import dataTableClasses from "../../ui/crud/dataTableclasses";
import NavButtons from "../../ui/crud/NavButtons";
import useSort from "../../ui/crud/useSort";
import CrudHeader from "../../ui/crud/CrudHeader";
import ConfirmDialogBox from "../../ui/ConfirmDialogBox";

function DisplayDataTable() {
  const dispatch = useDispatch();
  const records = useSelector((state) => state.students.students);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const [currentPageRecords, setCurrentPageRecords] = useState([]);

  const [numberOfPages, setNumberOfPages] = useState([]); // [1, 2, 3, 4, 5]
  const totalPages = Math.ceil(records.length / recordsPerPage);
  const pageNumbers = Array.from({ length: numberOfPages }, (_, i) => i + 1);

  const { handleSort, sortedPageRecords } = useSort(
    records,
    currentPage,
    recordsPerPage
  );

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
      currentPageRecords = records;
    } else {
      pages = Math.ceil(records.length / recordsPerPage);
      currentPageRecords = records.slice(
        (currentPage - 1) * recordsPerPage,
        currentPage * recordsPerPage
      );
    }
    setNumberOfPages(pages);
    setCurrentPageRecords(pages === 0 ? [] : currentPageRecords);
  }, [records, currentPage, recordsPerPage]);

  return (
    <div className="w-full flex flex-col min-h-[50vh] justify-center items-center">
      <h1 className="text-black text-3xl font-semibold font-Montserrat">
        Students Catalog
      </h1>
      <CrudHeader
        records={records}
        currentPage={currentPage}
        currentPageRecords={currentPageRecords}
        setCurrentPageRecords={setCurrentPageRecords}
        recordsPerPage={recordsPerPage}
        setRecordsPerPage={setRecordsPerPage}
      />

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
          {sortedPageRecords.length > 0 ? (
            sortedPageRecords.map((data) => (
              <EntityRow key={data.id} entity={data} />
            ))
          ) : (
            <tr>
              <td colSpan="6">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
      <ConfirmDialogBox />
      <NavButtons
        records={records}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        recordsPerPage={recordsPerPage}
        totalPages={totalPages}
        pageNumbers={pageNumbers}
      />
    </div>
  );
}

export default DisplayDataTable;
