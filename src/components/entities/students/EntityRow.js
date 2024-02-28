import React from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaEye, FaEdit } from "react-icons/fa";
import ConfirmDialogBox from "../../ui/ConfirmDialogBox";
import PropTypes from "prop-types";

const ENTITY_ROW_CLASSNAME = "bg-white border-b";
const ENTITY_CELL_CLASSNAME =
  "text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap";

const EntityRow = ({
  entity,
  selectedStudentName,
  confirmDialogBoxOpen,
  handleDeleteStudent,
  handleOpenConfirmDialogBox,
  handleCloseConfirmDialogBox,
}) => (
  <tr className={ENTITY_ROW_CLASSNAME}>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
      {entity.id}
    </td>
    <td className={ENTITY_CELL_CLASSNAME}>{entity.name}</td>
    <td className={ENTITY_CELL_CLASSNAME}>{entity.email}</td>
    <td className={ENTITY_CELL_CLASSNAME}>{entity.phoneNumber}</td>
    <td className={ENTITY_CELL_CLASSNAME}>{entity.address.city}</td>
    <td className="flex justify-center items-center space-x-4 mt-1">
      <Link
        to={`/student/${entity.id}`}
        className="flex items-center px-6 py-2 font-normal text-white bg-black rounded-lg w-30"
        title="View details"
      >
        <FaEye />
      </Link>
      <Link
        to={`/editstudent/${entity.id}`}
        className="flex items-center px-6 py-2 font-normal text-white bg-blue-600 rounded-lg w-30"
        title="Edit information"
      >
        <FaEdit />
      </Link>
      <Link
        onClick={() => handleOpenConfirmDialogBox(entity.id, entity.name)}
        className="flex items-center px-6 py-2 font-normal text-white bg-red-600 rounded-lg w-30"
        title="Delete this record"
      >
        <FaTrash />
      </Link>
      <ConfirmDialogBox
        isOpen={confirmDialogBoxOpen}
        onClose={handleCloseConfirmDialogBox}
        selectedEntityName={selectedStudentName}
        onDelete={handleDeleteStudent}
      />
    </td>
  </tr>
);

EntityRow.propTypes = {
  entity: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    address: PropTypes.shape({
      city: PropTypes.string,
    }),
  }).isRequired,
  selectedStudentName: PropTypes.string.isRequired,
  confirmDialogBoxOpen: PropTypes.bool.isRequired,
  handleDeleteStudent: PropTypes.func.isRequired,
  handleOpenConfirmDialogBox: PropTypes.func.isRequired,
  handleCloseConfirmDialogBox: PropTypes.func.isRequired,
};

export default EntityRow;
