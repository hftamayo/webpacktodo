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
  const baseClassName = dataTableClasses.navButton;
  const disabledClassName = "bg-gray-500 hover:bg-gray-500 cursor-not-allowed";
  const enabledClassName = "bg-blue-500 hover:bg-blue-700";

  const firstButtonClassName = `${baseClassName} ${
    currentPage === 1 ? disabledClassName : enabledClassName
  }`;

  const backButtonClassName = `${baseClassName} ${
    currentPage === 1 ? disabledClassName : enabledClassName
  }`;

  const forwardButtonClassName = `${baseClassName} ${
    currentPage >= totalPages ? disabledClassName : enabledClassName
  }`;

  const endButtonClassName = `${baseClassName} ${
    currentPage >= totalPages ? disabledClassName : enabledClassName
  }`;

  return (
    <nav className="flex items-center justify-between pt-4">
      <div className="flex items-center justify-center">
        <button
          className={`${firstButtonClassName}`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(1)}
        >
          <FaAngleDoubleLeft className="h-5 w-5" />
        </button>
        <div className="border-gray-200 my-4 px-1"></div>
        <button
          className={`${backButtonClassName}`}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((old) => Math.max(old - 1, 1))}
        >
          <FaAngleLeft className="h-5 w-5" />
        </button>
        <div className="border-gray-200 my-4 px-1"></div>
        <button
          className={`${forwardButtonClassName}`}
          disabled={currentPage >= totalPages}
          onClick={() => setCurrentPage((old) => Math.min(old + 1, totalPages))}
        >
          <FaAngleRight className="h-5 w-5" />
        </button>
        <div className="border-t border-gray-200 my-4 px-1"></div>
        <button
          className={`${endButtonClassName}`}
          disabled={currentPage >= totalPages}
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
          className="px-3 py-1 bg-gray-800 text-white rounded-md"
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
