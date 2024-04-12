import { useState, useEffect } from "react";

export default function usePagination(records, currentPage, recordsPerPage) {
  const [currentPageRecords, setCurrentPageRecords] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0);

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

  return {
    paginatedNumberOfPages: numberOfPages,
    paginatedRecords: currentPageRecords,
  };
}
