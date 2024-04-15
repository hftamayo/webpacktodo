import { useState, useEffect } from "react";

export default function usePagination(records, currentPage, recordsPerPage) {
  const [currentPageRecords, setCurrentPageRecords] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0);

  useEffect(() => {
    if(Array.isArray(records)){
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = records
      ? records.slice(indexOfFirstRecord, indexOfLastRecord)
      : [];

      setNumberOfPages(Math.ceil(records.length / recordsPerPage));
      setCurrentPageRecords(currentRecords);
    } else {
      setNumberOfPages(0);
      setCurrentPageRecords([]);
    }
  }, [records, currentPage, recordsPerPage]);

  return {
    paginatedNumberOfPages: numberOfPages,
    paginatedRecords: currentPageRecords,
  };
}
