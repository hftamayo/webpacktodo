import { useEffect, useState } from "react";

export default function useSort(records, currentPage, recordsPerPage) {
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortedRecords, setSortedRecords] = useState([]);

  useEffect(() => {
    setSortedRecords([...records]);
  }, [records]);

  const handleSort = (field) => {
    let direction = "asc";
    if (field === sortField) {
      direction = sortDirection === "asc" ? "desc" : "asc";
    }
    setSortField(field);
    setSortDirection(direction);

    const sorted = [...sortedRecords].sort((a, b) => {
      if (a[field] < b[field]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setSortedRecords(sorted);
  };

  const sortedPageRecords = sortedRecords.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  return { handleSort, sortedPageRecords };
}
