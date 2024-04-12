import { useState, useEffect } from "react";

export default function usePagination(records, currentPage, recordsPerPage) {
  const [currentPageRecords, setCurrentPageRecords] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0);

  useEffect(() => {
    let pages;
    let currentPageRecords;

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = records
      ? records.slice(indexOfFirstRecord, indexOfLastRecord)
      : [];

    if (recordsPerPage === -1) {
      pages = 1;
      currentPageRecords = currentRecords;
    } else {
      pages = Math.ceil(currentRecords.length / recordsPerPage);
      currentPageRecords = currentRecords.slice(
        (currentPage - 1) * recordsPerPage,
        currentPage * recordsPerPage
      );
    }
    setNumberOfPages(pages);
    setCurrentPageRecords(pages === 0 ? [] : currentPageRecords);
  }, [records, currentPage, recordsPerPage]);

  return {
    paginatedNumberOfPages: numberOfPages,
    paginatedRecords: currentPageRecords,
  };
}
