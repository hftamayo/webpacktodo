import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openDialog, closeDialog } from "../../store/dialogSlice";
import { Link } from "react-router-dom";
import { FaTrash, FaEye, FaEdit } from "react-icons/fa";
import ConfirmDialogBox from "../../ui/ConfirmDialogBox";
import PropTypes from "prop-types";
import { entityRow } from "../../ui/crud/rowClasses";

const EntityRow = ({
  entity,
  selectedEntityName,
  confirmDialogBoxOpen,
  handleDeleteEntity,
  handleOpenConfirmDialogBox,
  handleCloseConfirmDialogBox,
}) => {
  const dispatch = useDispatch();

  const handleOpenConfirmDialogBox = (title, message) => {
    dispatch(openDialog({ title, message }));
  };

  const handleCloseDialog = () => {
    dispatch(closeDialog());
  };

  return (
    <tr className={entityRow.row}>
      <td className={entityRow.dataCellID}>{entity.id}</td>
      <td className={entityRow.dataCell}>{entity.name}</td>
      <td className={entityRow.dataCell}>{entity.email}</td>
      <td className={entityRow.dataCell}>{entity.phoneNumber}</td>
      <td className={entityRow.dataCell}>{entity.address.city}</td>
      <td className={entityRow.actionButtonsGroup}>
        <Link
          to={`/student/${entity.id}`}
          className={entityRow.actionButtonView}
          title="View details"
        >
          <FaEye />
        </Link>
        <Link
          to={`/editstudent/${entity.id}`}
          className={entityRow.actionButtonEdit}
          title="Edit information"
        >
          <FaEdit />
        </Link>
        <Link
          onClick={() => handleOpenConfirmDialogBox(entity.id, entity.name)}
          className={entityRow.actionButtonDelete}
          title="Delete this record"
        >
          <FaTrash />
        </Link>
        <ConfirmDialogBox
          isOpen={confirmDialogBoxOpen}
          onClose={handleCloseConfirmDialogBox}
          selectedEntityName={selectedEntityName}
          onDelete={handleDeleteEntity}
        />
      </td>
    </tr>
  );
};

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
  selectedEntityName: PropTypes.string.isRequired,
  confirmDialogBoxOpen: PropTypes.bool.isRequired,
  handleDeleteEntity: PropTypes.func.isRequired,
  handleOpenConfirmDialogBox: PropTypes.func.isRequired,
  handleCloseConfirmDialogBox: PropTypes.func.isRequired,
};

export default EntityRow;
