import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudent } from "../../store/studentSlice";
import { toast } from "react-toastify";

function DetailStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const studentId = Number.parseInt(id);
  const dispatch = useDispatch();
  const student = useSelector((state) =>
    state.students.students.find((student) => student.id === studentId)
  );

  useEffect(() => {
    if (!student) {
      try {
        dispatch(getStudent()).then((action) => {
          if (getStudent.fulfilled.match(action)) {
            console.log("Status: succeeded"); // Log the status
          } else if (getStudent.rejected.match(action)) {
            console.log("Status: failed"); // Log the status
          }
        });
      } catch (error) {
        toast.error(
          "An error occurred while trying to load the data, the event was reported. Please try again later."
        );
      }
    }
  }, [dispatch, id, student]);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="flex flex-col items-center justify-center w-full max-w-2xl px-4 py-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Current Student Information</h2>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 flex items-center justify-center">
            <p className="block text-md font-medium text-gray-700">
              Full Name:
            </p>
          </div>
          <div className="col-span-2">
            <p className="w-[100%] text-lg font-bold px-3 py-2 ">
              {student?.name}
            </p>
          </div>

          <div className="col-span-1 flex items-center justify-center">
            <p className="block text-md font-medium text-gray-700">
              User Name:
            </p>
          </div>
          <div className="col-span-2">
            <p className="w-[100%] text-lg font-bold px-3 py-2 ">
              {student?.username}
            </p>
          </div>

          <div className="col-span-1 flex items-center justify-center">
            <p className="block text-md font-medium text-gray-700">Email:</p>
          </div>
          <div className="col-span-2">
            <p className="w-[100%] text-lg font-bold px-3 py-2 ">
              {student?.email}
            </p>
          </div>

          <div className="col-span-1 flex items-center justify-center">
            <p className="block text-md font-medium text-gray-700">Street:</p>
          </div>
          <div className="col-span-2">
            <p className="w-[100%] text-lg font-bold px-3 py-2 ">
              {student?.address.street}
            </p>
          </div>

          <div className="col-span-1 flex items-center justify-center">
            <p className="block text-md font-medium text-gray-700">Suite:</p>
          </div>
          <div className="col-span-2">
            <p className="w-[100%] text-lg font-bold px-3 py-2 ">
              {student?.address.suite}
            </p>
          </div>

          <div className="col-span-1 flex items-center justify-center">
            <p className="block text-md font-medium text-gray-700">City:</p>
          </div>
          <div className="col-span-2">
            <p className="w-[100%] text-lg font-bold px-3 py-2 ">
              {student?.address.city}
            </p>
          </div>

          <div className="col-span-1 flex items-center justify-center">
            <p className="block text-md font-medium text-gray-700">Zip Code:</p>
          </div>
          <div className="col-span-2">
            <p className="w-[100%] text-lg font-bold px-3 py-2 ">
              {student?.address.zipcode}
            </p>
          </div>

          <div className="col-span-1 flex items-center justify-center">
            <p className="block text-md font-medium text-gray-700">Latitude:</p>
          </div>
          <div className="col-span-2">
            <p className="w-[100%] text-lg font-bold px-3 py-2 ">
              {student?.position.lat}
            </p>
          </div>

          <div className="col-span-1 flex items-center justify-center">
            <p className="block text-md font-medium text-gray-700">
              Longitude:
            </p>
          </div>
          <div className="col-span-2">
            <p className="w-[100%] text-lg font-bold px-3 py-2 ">
              {student?.position.lng}
            </p>
          </div>

          <div className="col-span-1 flex items-center justify-center">
            <p className="block text-md font-medium text-gray-700">
              Phone Number:
            </p>
          </div>
          <div className="col-span-2">
            <p className="w-[100%] text-lg font-bold px-3 py-2 ">
              {student?.phoneNumber}
            </p>
          </div>

          <div className="col-span-1 flex items-center justify-center">
            <p className="block text-md font-medium text-gray-700">
              Company Name:
            </p>
          </div>
          <div className="col-span-2">
            <p className="w-[100%] text-lg font-bold px-3 py-2 ">
              {student?.company.companyName}
            </p>
          </div>

          <div className="col-span-1 flex items-center justify-center">
            <p className="block text-md font-medium text-gray-700">
              Company Address:
            </p>
          </div>
          <div className="col-span-2">
            <p className="w-[100%] text-lg font-bold px-3 py-2 ">
              {student?.company.companyAddress}
            </p>
          </div>
        </div>

        <div className="space-x-4 mt-6">
          <button
            onClick={() => navigate(`/editstudent/${studentId}`)}
            className="px-4 py-2 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Edit
          </button>
          <button
            onClick={() => navigate("/students")}
            className="px-4 py-2 text-base font-medium text-white bg-yellow-600 rounded-md hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default DetailStudent;
