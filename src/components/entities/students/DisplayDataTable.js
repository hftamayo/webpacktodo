import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import DialogBox from "../../ui/DialogBox";

function DisplayDataTable() {
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedStudentName, setSelectedStudentName] = useState(null);

  const loadUsers = async () => {
    try {
      await axios.get("http://localhost:3004/students").then((response) => {
        setUsers(response.data.reverse());
      });
    } catch (error) {
      toast.error(
        "An error occurred while trying to load the data, the event was reported. Please try again later."
      );
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  function deleteStudent(id) {
    axios
      .delete(`http://localhost:3004/students/${id}`)
      .then((response) => {
        toast.success("Data deleted permanently", {
          className: "bg-black text-yellow-500",
          progressClassName: "bg-blue-600",
        });
        loadUsers();
      })
      .catch((error) => {
        toast.error(
          "An error occurred while trying to delete the selected data, the event was reported. Please try again later."
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
          {users.map((data, index) => (
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
                  className="px-6 py-2 font-normal text-white bg-black rounded-lg"
                >
                  View
                </Link>
                <Link
                  to={`/editstudent/${data.id}`}
                  className="px-6 py-2 font-normal text-white bg-blue-600 rounded-lg"
                >
                  Edit
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
                          deleteStudent(selectedId);
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
