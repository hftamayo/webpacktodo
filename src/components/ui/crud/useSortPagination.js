import { useEffect, useState } from "react";

export default function useSortPagination(
  records,
  currentPage,
  recordsPerPage
) {
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("desc");
  const [sortedPaginatedRecords, setSortedPaginatedRecords] = useState([]);

  const handleSort = (field = "id") => {
    let direction = "asc";
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

    const startIndex = (currentPage - 1) * recordsPerPage;
    const endIndex = startIndex + recordsPerPage;
    const paginated = sorted.slice(startIndex, endIndex);

    setSortedPaginatedRecords(paginated);
  };

  useEffect(() => {
    handleSort(sortField);
  }, [records, currentPage, recordsPerPage, sortField]);

  return { sortedPaginatedRecords, handleSort };
}
