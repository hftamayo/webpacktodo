import { useEffect, useRef, useState } from "react";

export default function useSortPagination(
  records,
  currentPage,
  recordsPerPage
) {
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("desc");
  const [sortedRecords, setSortedRecords] = useState([]);
  const [sortedPaginatedRecords, setSortedPaginatedRecords] = useState([]);

  const prevRecordsRef = useRef();
  useEffect(() => {
    prevRecordsRef.current = records;
  });
  const prevRecords = prevRecordsRef.current;

  const handleSort = useCallback(
    (field = "id") => {
      if (prevRecordsRef.current !== records) {
        let direction = "desc";
        if (field === sortField) {
          direction = sortDirection === "asc" ? "desc" : "asc";
        }
        setSortField(field);
        setSortDirection(direction);

        const sorted = [...records].sort((a, b) => {
          if (a[field] < b[field]) {
            return direction === "asc" ? -1 : 1;
          }
          if (a[field] > b[field]) {
            return direction === "asc" ? 1 : -1;
          }
          return 0;
        });
        setSortedRecords(sorted);
      }
    },
    [records, sortField, sortDirection]
  );

  useEffect(() => {
    handleSort(sortField);
  }, [records, sortField]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const paginated = sortedRecords.slice(startIndex, endIndex);
    setSortedPaginatedRecords(paginated);
  }, [sortedRecords, currentPage, recordsPerPage]);

  return { sortedPaginatedRecords, handleSort };
}
