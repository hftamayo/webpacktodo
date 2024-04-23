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
    <div className="flex justify-center">
      <form className="w-full max-w-lg">
        <div className="rounded overflow-hidden shadow-lg p-6 bg-white">
          <div className="flex items-center justify-center font-bold text-xl mb-2">
            Student Information
          </div>
          <div>
            <div className="flex flex-wrap -mx-3">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <p className="block text-md font-medium text-gray-700">
                  Full Name
                </p>
                <p
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 font-bold border rounded py-3 px-4 mb-3 leading-tight }`}
                >
                  {student?.name ? (
                    student.name
                  ) : (
                    <span className="text-red-500">N/A</span>
                  )}
                </p>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <p className="block text-md font-medium text-gray-700">
                  User Name
                </p>
                <p
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 font-bold border rounded py-3 px-4 mb-3 leading-tight }`}
                >
                  {student?.username ? (
                    student.username
                  ) : (
                    <span className="text-red-500">N/A</span>
                  )}
                </p>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <p className="block text-md font-medium text-gray-700">Email</p>
                <p
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 font-bold border rounded py-3 px-4 mb-3 leading-tight }`}
                >
                  {student?.email ? (
                    student.email
                  ) : (
                    <span className="text-red-500">N/A</span>
                  )}
                </p>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <p className="block text-md font-medium text-gray-700">
                  Street
                </p>
                <p
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 font-bold border rounded py-3 px-4 mb-3 leading-tight }`}
                >
                  {student?.address.street ? (
                    student.address.street
                  ) : (
                    <span className="text-red-500">N/A</span>
                  )}
                </p>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <p className="block text-md font-medium text-gray-700">Suite</p>
                <p
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 font-bold border rounded py-3 px-4 mb-3 leading-tight }`}
                >
                  {student?.address.suite ? (
                    student.address.suite
                  ) : (
                    <span className="text-red-500">N/A</span>
                  )}
                </p>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <p className="block text-md font-medium text-gray-700">City</p>
                <p
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 font-bold border rounded py-3 px-4 mb-3 leading-tight }`}
                >
                  {student?.address.city ? (
                    student.address.city
                  ) : (
                    <span className="text-red-500">N/A</span>
                  )}
                </p>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <p className="block text-md font-medium text-gray-700">
                  Zipcode
                </p>
                <p
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 font-bold border rounded py-3 px-4 mb-3 leading-tight }`}
                >
                  {student?.address.zipcode ? (
                    student.address.zipcode
                  ) : (
                    <span className="text-red-500">N/A</span>
                  )}
                </p>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <p className="block text-md font-medium text-gray-700">
                  Latitude
                </p>
                <p
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 font-bold border rounded py-3 px-4 mb-3 leading-tight }`}
                >
                  {student?.position.lat ? (
                    student.position.lat
                  ) : (
                    <span className="text-red-500">N/A</span>
                  )}
                </p>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <p className="block text-md font-medium text-gray-700">
                  Longitude
                </p>
                <p
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 font-bold border rounded py-3 px-4 mb-3 leading-tight }`}
                >
                  {student?.position.lng ? (
                    student.position.lng
                  ) : (
                    <span className="text-red-500">N/A</span>
                  )}
                </p>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <p className="block text-md font-medium text-gray-700">
                  Phone Number
                </p>
                <p
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 font-bold border rounded py-3 px-4 mb-3 leading-tight }`}
                >
                  {student?.phoneNumber ? (
                    student.phoneNumber
                  ) : (
                    <span className="text-red-500">N/A</span>
                  )}
                </p>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <p className="block text-md font-medium text-gray-700">
                  Company Name
                </p>
                <p
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 font-bold border rounded py-3 px-4 mb-3 leading-tight }`}
                >
                  {student?.company.companyName ? (
                    student.company.companyName
                  ) : (
                    <span className="text-red-500">N/A</span>
                  )}
                </p>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <p className="block text-md font-medium text-gray-700">
                  Company Address
                </p>
                <p
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 font-bold border rounded py-3 px-4 mb-3 leading-tight }`}
                >
                  {student?.company.companyAddress ? (
                    student.company.companyAddress
                  ) : (
                    <span className="text-red-500">N/A</span>
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4 px-4 space-x-4">
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
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DetailStudent;
