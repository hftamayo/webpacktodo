import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import PropTypes from "prop-types";

function CrudHeader({
  records,
  currentPageRecords,
  setCurrentPageRecords,
  recordsPerPage,
  setRecordsPerPage,
  setSearchCriteria,
}) {
  const handleSearch = (searchCriteria) => {
    setSearchCriteria(searchCriteria.toLowerCase());
    const filteredRecords = records.filter((entity) =>
      Object.values(entity).some((value) =>
        value.toString().toLowerCase().includes(searchCriteria)
      )
    );

    setCurrentPageRecords(filteredRecords);
  };

  const exportToExcel = () => {
    // Convert the data to JSON
    const jsonData = JSON.stringify(currentPageRecords, null, 2);
    console.log("data to the PDF report: ", jsonData);

    // Send the data to the backend
    // fetch("/api/exportToPdf", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: jsonData,
    // })
    //   .then((response) => response.blob())
    //   .then((blob) => {
    //     // Create a link element and trigger a download
    //     const url = window.URL.createObjectURL(blob);
    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.setAttribute("download", "students.pdf");
    //     document.body.appendChild(link);
    //     link.click();
    //     link.remove();
    //   })
    //   .catch((error) => console.error("Error:", error));
  };

  const exportToPdf = () => {
    const jsonData = JSON.stringify(currentPageRecords, null, 2);
    console.log("data to the PDF report: ", jsonData);
  };

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center">
        <label
          htmlFor="searchCriteria"
          className="mr-2 block text-md font-medium text-gray-700"
        >
          Search Criteria:
        </label>
        <div className="border-gray-200 my-4 px-1"></div>
        <input
          type="text"
          id="searchCriteria"
          name="searchCriteria"
          onChange={(event) => handleSearch(event.target.value)}
          disabled={records.length === 0}
          className="flex-grow text-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
        />
      </div>
      <div className="border-gray-100 my-4 px-24"></div>
      <div className="flex-grow text-center">
        Displaying:{" "}
        <span className="font-semibold text-red-500">
          {currentPageRecords.length} of {records.length}
        </span>
        {" records"}
      </div>
      <div className="border-gray-100 my-4 px-24"></div>

      <div className="flex-shrink-0">
        Records Per Page:{" "}
        <select
          className="px-3 py-1 bg-gray-800 text-white rounded-md"
          value={recordsPerPage}
          onChange={(event) => setRecordsPerPage(event.target.value)}
          disabled={records.length === 0}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="-1">All</option>
        </select>
      </div>
      <div className="border-gray-100 my-4 px-24"></div>

      <div className="flex flex-grow">
        Export:{" "}
        <button onClick={() => exportToPdf()} className="px-1">
          <FaFilePdf size={28} color="red" />
        </button>
        <button onClick={() => exportToExcel()} className="px-1">
          <FaFileExcel size={28} color="green" />
        </button>
      </div>
    </div>
  );
}

CrudHeader.propTypes = {
  records: PropTypes.array.isRequired,
  currentPageRecords: PropTypes.array.isRequired,
  setCurrentPageRecords: PropTypes.func.isRequired,
  recordsPerPage: PropTypes.number.isRequired,
  setRecordsPerPage: PropTypes.func.isRequired,
  setSearchCriteria: PropTypes.func.isRequired,
};

export default CrudHeader;
