import { useState } from "react";

export default function useSort(records, currentPage, recordsPerPage) {
  const [sortField, setSortField] = useState("id");
  const [sortDirection, setSortDirection] = useState("desc");
  const [sortedRecords, setSortedRecords] = useState(records || []);

  const handleSort = (field = 'id') => {
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

    setSortedRecords(sorted);
  };

  const sortedPageRecords = sortedRecords.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  return { sortedPageRecords, handleSort  };
}
