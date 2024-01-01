import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function DisplayDataTable() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    axios.get("http://localhost:3004/students").then((response) => {
      setUsers(response.data.reverse());
    });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  function deleteStudent(id) {
    axios.delete(`http://localhost:3004/students/${id}`).then((response) => {
      loadUsers();
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
                  onClick={() => deleteStudent(data.id)}
                  className="px-6 py-2 font-normal text-white bg-red-600 rounded-lg"
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayDataTable;
