import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStudents, deleteStudent } from "../../store/studentSlice";
import { toast } from "react-toastify";

import EntityRow from "./EntityRow";

function DisplayDataTable() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(5);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = students.slice(firstIndex, lastIndex);


  const [selectedId, setSelectedId] = useState(null);
  const [selectedStudentName, setSelectedStudentName] = useState(null);
  const [confirmDialogBoxOpen, setConfirmDialogBoxOpen] = useState(false);

  const ENTITY_HEADER_CLASSNAME = "text-sm font-medium text-white px-6 py-4";

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
            <EntityRow
              key={data.id}
              entity={data}
              selectedStudentName={selectedStudentName}
              confirmDialogBoxOpen={confirmDialogBoxOpen}
              handleDeleteStudent={handleDeleteStudent}
              handleOpenConfirmDialogBox={handleOpenConfirmDialogBox}
              handleCloseConfirmDialogBox={handleCloseConfirmDialogBox}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayDataTable;
