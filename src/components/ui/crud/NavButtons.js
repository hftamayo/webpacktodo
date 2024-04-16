import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
} from "react-icons/fa";
import dataTableClasses from "./dataTableclasses";
import PropTypes from "prop-types";

function NavButtons({
  records,
  currentPage,
  setCurrentPage,
  recordsPerPage,
  totalPages,
  pageNumbers,
}) {
  const NAVIGATION_BUTTON_CLASSNAME = `${dataTableClasses.navButton} ${
    records.length === 0 || currentPage === 1 || recordsPerPage === -1
      ? "bg-gray-500 hover:bg-gray-500 cursor-not-allowed"
      : ""
  }`;

  return (
    <nav className="flex items-center justify-between pt-4">
      <div className="flex items-center justify-center">
        <button
          className={`${NAVIGATION_BUTTON_CLASSNAME} ${
            records.length === 0 || currentPage === 1 || recordsPerPage === -1
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
          }`}
          disabled={
            records.length === 0 || currentPage === 1 || recordsPerPage === -1
          }
          onClick={() => setCurrentPage(1)}
        >
          <FaAngleDoubleLeft className="h-5 w-5" />
        </button>
        <div className="border-t border-gray-200 my-4 px-1"></div>
        <button
          className={`${NAVIGATION_BUTTON_CLASSNAME} ${
            records.length === 0 || currentPage === 1 || recordsPerPage === -1
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
          }`}
          disabled={
            records.length === 0 || currentPage === 1 || recordsPerPage === -1
          }
          onClick={() => setCurrentPage((old) => Math.max(old - 1, 1))}
        >
          <FaAngleLeft className="h-5 w-5" />
        </button>
        <div className="border-gray-200 my-4 px-1"></div>
        <button
          className={`${NAVIGATION_BUTTON_CLASSNAME} ${
            records.length === 0 ||
            currentPage === totalPages ||
            recordsPerPage === -1
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
          }`}
          disabled={
            records.length === 0 ||
            currentPage === totalPages ||
            recordsPerPage === -1
          }
          onClick={() => setCurrentPage((old) => Math.min(old + 1, totalPages))}
        >
          <FaAngleRight className="h-5 w-5" />
        </button>
        <div className="border-t border-gray-200 my-4 px-1"></div>
        <button
          className={`${NAVIGATION_BUTTON_CLASSNAME} ${
            records.length === 0 ||
            currentPage === totalPages ||
            recordsPerPage === -1
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
          }`}
          disabled={
            records.length === 0 ||
            currentPage === totalPages ||
            recordsPerPage === -1
          }
          onClick={() => setCurrentPage(totalPages)}
        >
          <FaAngleDoubleRight className="h-5 w-5" />
        </button>
      </div>
      <div className="flex items-center">
        <div className="border-gray-200 my-4 px-1"></div>
        Page Selector:
        <div className="border-gray-200 my-4 px-1"></div>
        <select
          value={currentPage}
          onChange={(e) => setCurrentPage(Number(e.target.value))}
          className="px-3 py-0 bg-gray-800 text-white rounded-md"
        >
          {pageNumbers?.map((number) => (
            <option
              key={number}
              value={number}
              disabled={recordsPerPage === -1}
            >
              {number}
            </option>
          ))}
        </select>
        <div className="border-gray-200 my-4 px-1"></div>
      </div>
    </nav>
  );
}

NavButtons.propTypes = {
  records: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  recordsPerPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  pageNumbers: PropTypes.array.isRequired,
};

export default NavButtons;
