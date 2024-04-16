import { useState, useEffect } from "react";

export default function usePagination(records, currentPage, recordsPerPage) {
  const [paginatedRecords, setPaginatedPageRecords] = useState([]);
  //const [numberOfPages, setNumberOfPages] = useState(0);

  useEffect(() => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    setPaginatedPageRecords(records.slice(startIndex, endIndex));
  }, [records, currentPage, recordsPerPage]);

  return { paginatedRecords };
}
