import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudents, deleteStudent } from "../../store/studentSlice";
import { toast } from "react-toastify";
import { FaTrash, FaEye, FaEdit } from "react-icons/fa";
import ConfirmDialogBox from "../../ui/ConfirmDialogBox";

function DisplayDataTable() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedStudentName, setSelectedStudentName] = useState(null);
  const [confirmDialogBoxOpen, setConfirmDialogBoxOpen] = useState(false);

  const ENTITY_ROW_CLASSNAME = "bg-white border-b";
  const ENTITY_HEADER_CLASSNAME = "text-sm font-medium text-white px-6 py-4";
  const ENTITY_CELL_CLASSNAME =
    "text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap";

  const loadStudents = () => {
    try {
      dispatch(getStudents()).then((action) => {
        if (getStudents.fulfilled.match(action)) {
          console.log("Status: succeeded"); // Log the status
        } else if (getStudents.rejected.match(action)) {
          console.log("Status: failed"); // Log the status
        }
      });
    } catch (error) {
      toast.error(
        "An error occurred while trying to load the data, the event was reported. Please try again later."
      );
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleDeleteStudent = (event) => {
    event.stopPropagation();
    handleDeleteSelectedStudent(selectedId);
    handleResetEntitySelection();
    setConfirmDialogBoxOpen(false);
  };

  const handleResetEntitySelection = () => {
    setSelectedId(null);
    setSelectedStudentName(null);
  };

  const handleDeleteSelectedStudent = (id) => {
    dispatch(deleteStudent(id))
      .then((action) => {
        if (deleteStudent.fulfilled.match(action)) {
          toast.success("Data deleted permanently", {
            className: "bg-black text-yellow-500",
            progressClassName: "bg-blue-600",
          });
          loadStudents();
        } else if (deleteStudent.rejected.match(action)) {
          console.log("deleteStudent action rejected");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          "An error occurred while trying to delete the selected data, the event was reported. Please try again later. "
        );
      });
  };

  const handleOpenConfirmDialogBox = (id, name) => {
    setSelectedId(id);
    setSelectedStudentName(name);
    setConfirmDialogBoxOpen(true);
  };

  const handleCloseConfirmDialogBox = (event) => {
    event.stopPropagation();
    handleResetEntitySelection();
    setConfirmDialogBoxOpen(false);
  };

  const EntityRow = ({ entity }) => (
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
        >
          <FaEye />
          <span className="ml-2">View</span>
        </Link>
        <Link
          to={`/editstudent/${entity.id}`}
          className="flex items-center px-6 py-2 font-normal text-white bg-blue-600 rounded-lg w-30"
        >
          <FaEdit />
          <span className="ml-2">Edit</span>
        </Link>
        <Link
          onClick={() => handleOpenConfirmDialogBox(entity.id, entity.name)}
          className="flex items-center px-6 py-2 font-normal text-white bg-red-600 rounded-lg w-30"
        >
          <FaTrash />
          <span className="ml-2">Delete</span>
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

  return (
    <div className="w-full flex flex-col min-h-[50vh] justify-center items-center">
      <h1 className="text-black text-3xl font-semibold font-Montserrat">
        Students Catalog
      </h1>
      <table className="w-[95%] text-center overflow-hidden overflow-y-scroll mt-8 border-2 border-b-2 border-black">
        <thead className="border-b bg-gray-800">
          <tr>
            <th scope="col" className={ENTITY_HEADER_CLASSNAME}>
              #
            </th>
            <th className={ENTITY_HEADER_CLASSNAME}>Name</th>
            <th className={ENTITY_HEADER_CLASSNAME}>Email</th>
            <th className={ENTITY_HEADER_CLASSNAME}>Phone</th>
            <th className={ENTITY_HEADER_CLASSNAME}>Address</th>
            <th className={ENTITY_HEADER_CLASSNAME}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((data) => (
            <EntityRow key={data.id} entity={data} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayDataTable;
