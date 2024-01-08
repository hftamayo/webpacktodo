import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudents, deleteStudent } from "../../store/studentSlice";
import { toast } from "react-toastify";
import { FaTrash, FaEye, FaEdit } from "react-icons/fa";
import DialogBox from "../../ui/DialogBox";

function DisplayDataTable() {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students.students);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedStudentName, setSelectedStudentName] = useState(null);

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

  function deleteSelectedStudent(id) {
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
  }

  return (
    <div className="w-full flex flex-col min-h-[50vh] justify-center items-center">
      <h1 className="text-black text-3xl font-semibold font-Montserrat">
        Students Catalog
      </h1>
      <table className="w-[95%] text-center overflow-hidden overflow-y-scroll mt-8 border-2 border-b-2 border-black">
        <thead className="border-b bg-gray-800">
          <tr>
            <th
              scope="col"
              className="text-sm font-medium text-white px-6 py-4"
            >
              ID
            </th>
            <th className="text-sm font-medium text-white px-6 py-4">Name</th>
            <th className="text-sm font-medium text-white px-6 py-4">Email</th>
            <th className="text-sm font-medium text-white px-6 py-4">Phone</th>
            <th className="text-sm font-medium text-white px-6 py-4">
              Address
            </th>
            <th className="text-sm font-medium text-white px-6 py-4">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((data, index) => (
            <tr key={data.id} className="bg-white border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {index + 1}
              </td>
              <td className="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {data.name}
              </td>
              <td className="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {data.email}
              </td>
              <td className="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {data.phoneNumber}
              </td>
              <td className="text-lg text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {data.address.city}
              </td>
              <td className="flex justify-center items-center space-x-4 mt-1">
                <Link
                  to={`/student/${data.id}`}
                  className="flex items-center px-6 py-2 font-normal text-white bg-black rounded-lg w-30"
                >
                  <FaEye />
                  <span className="ml-2">Edit</span>
                </Link>
                <Link
                  to={`/editstudent/${data.id}`}
                  className="flex items-center px-6 py-2 font-normal text-white bg-blue-600 rounded-lg w-30"
                >
                  <FaEdit />
                  <span className="ml-2">Edit</span>                  
                </Link>
                <Link
                  onClick={() => {
                    setSelectedId(data.id);
                    setSelectedStudentName(data.name);
                  }}
                  className="flex items-center px-6 py-2 font-normal text-white bg-red-600 rounded-lg w-30"
                >
                  <FaTrash />
                  <span className="ml-2">Delete</span>
                </Link>
                <DialogBox
                  open={selectedId !== null}
                  onClose={() => {
                    setSelectedId(null);
                    setSelectedStudentName(null);
                  }}
                  studentName={selectedStudentName}
                >
                  <div className="text-center w-56">
                    <FaTrash size={56} className="mx-auto text-red-500" />
                    <div className="mx-auto my-4 w-48">
                      <h3 className="text-lg font-black text-gray-800">
                        Confirm Delete
                      </h3>
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this data?{" "}
                        <span className="font-bold text-red-500">
                          {selectedStudentName}
                        </span>
                      </p>
                    </div>
                    <div className="flex gap-4">
                      <button
                        className="px-6 py-2 font-normal text-white bg-gray-600 rounded-lg"
                        onClick={() => {
                          setSelectedId(null);
                          setSelectedStudentName(null);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-6 py-2 font-normal text-white bg-red-600 rounded-lg"
                        onClick={() => {
                          deleteSelectedStudent(selectedId);
                          setSelectedId(null);
                          setSelectedStudentName(null);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </DialogBox>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayDataTable;
