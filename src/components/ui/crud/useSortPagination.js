import { useEffect, useRef, useState, useCallback } from "react";

export default function useSortPagination(
  records,
  currentPage,
  recordsPerPage,
  searchCriteria
) {
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("desc");
  const [sortedRecords, setSortedRecords] = useState([]);
  const [sortedPaginatedRecords, setSortedPaginatedRecords] = useState([]);

  const prevRecordsRef = useRef();
  useEffect(() => {
    prevRecordsRef.current = records;
  });

  const handleSort = useCallback(
    (field = "id", isInitialSort = false) => {
      let direction = sortDirection;
      if (!isInitialSort && field === sortField) {
        direction = sortDirection === "asc" ? "desc" : "asc";
      }
      setSortField(field);
      setSortDirection(direction);

      const filteredRecords = records.filter((record) =>
        Object.values(record).some((value) =>
          value.toString().toLowerCase().includes(searchCriteria.toLowerCase())
        )
      );

      const sorted = [...filteredRecords].sort((a, b) => {
        if (a[field] < b[field]) {
          return direction === "asc" ? -1 : 1;
        }
        if (a[field] > b[field]) {
          return direction === "asc" ? 1 : -1;
        }
        return 0;
      });
      setSortedRecords(sorted);
    },
    [records, sortField, sortDirection, searchCriteria]
  );

  useEffect(() => {
    handleSort(sortField, true);
  }, [records, sortField, searchCriteria]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const paginated = sortedRecords.slice(startIndex, endIndex);
    setSortedPaginatedRecords(paginated);
  }, [sortedRecords, currentPage, recordsPerPage]);

  return { sortedPaginatedRecords, handleSort };
}
