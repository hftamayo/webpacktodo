import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaSort } from "react-icons/fa";

import useFetchData from "./useFetchData";
import EntityRow from "./EntityRow";
import dataTableClasses from "../../../ui/crud/dataTableclasses";
import NavButtons from "../../../ui/crud/NavButtons";
import useSortPagination from "../../../ui/crud/useSortPagination";
import CrudHeader from "../../../ui/crud/CrudHeader";
import ConfirmDialogBox from "../../../ui/ConfirmDialogBox";

function DataTable() {
  const [isLoading, setIsLoading] = useState(true);
  const loadData = useCallback(useFetchData(), []);
  const records = useSelector((state) => state.students.students);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);

  const [currentPageRecords, setCurrentPageRecords] = useState([]);
  const totalPages = records ? Math.ceil(records.length / recordsPerPage) : 0;
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  useEffect(() => {
    //console.log("Data loaded: ", records);
    loadData().then(() => setIsLoading(false));
  }, [loadData]);

  const { sortedPaginatedRecords, handleSort } = useSortPagination(
    records || [],
    currentPage,
    recordsPerPage
  );

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
          {sortedPaginatedRecords && sortedPaginatedRecords.length > 0 ? (
            sortedPaginatedRecords.map((data) => (
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

export default DataTable;
