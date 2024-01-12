import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateStudent, getStudent } from "../../store/studentSlice";
import { useDispatch, useSelector } from "react-redux";

function EditStudent() {
  const [values, setValues] = useState({
    name: "",
    username: "",
    email: "",
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    latitude: "",
    longitude: "",
    phoneNumber: "",
    companyName: "",
    companyAddress: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    username: "",
    email: "",
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    latitude: "",
    longitude: "",
    phoneNumber: "",
    companyName: "",
    companyAddress: "",
  });

  const navigate = useNavigate();

  const { id } = useParams();
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

  useEffect(() => {
    if (student) {
      setValues({
        name: student.name,
        username: student.username,
        email: student.email,
        street: student.address.street,
        suite: student.address.suite,
        city: student.address.city,
        zipcode: student.address.zipcode,
        latitude: student.position.lat,
        longitude: student.position.lng,
        phoneNumber: student.phoneNumber,
        companyName: student.company.companyName,
        companyAddress: student.company.companyAddress,
      });
    }
  }, [student, setValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  function validate(values) {
    let errors = {};
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.username) {
      errors.username = "Username is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.street) {
      errors.street = "Street is required";
    }
    if (!values.suite) {
      errors.suite = "Suite is required";
    }
    if (!values.city) {
      errors.city = "City is required";
    }
    if (!values.zipcode) {
      errors.zipcode = "Zipcode is required";
    }
    if (!values.latitude) {
      errors.latitude = "Latitude is required";
    }
    if (!values.longitude) {
      errors.longitude = "Longitude is required";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    }
    if (!values.companyName) {
      errors.companyName = "Company name is required";
    }
    if (!values.companyAddress) {
      errors.companyAddress = "Company address is required";
    }
    return errors;
  }

  const data = {
    name: values.name,
    username: values.username,
    email: values.email,
    address: {
      street: values.street,
      suite: values.suite,
      city: values.city,
      zipcode: values.zipcode,
    },
    position: {
      lat: parseFloat(values.latitude),
      lng: parseFloat(values.longitude),
    },
    phoneNumber: values.phoneNumber,
    company: {
      companyName: values.companyName,
      companyAddress: values.companyAddress,
    },
  };

  const update = (e) => {
    e.preventDefault();
    const errors = validate(values);
    if (Object.keys(errors).length !== 0) {
      setErrors(errors);
      return;
    }

    dispatch(updateStudent(data)).then((action) => {
      if (updateStudent.fulfilled.match(action)) {
        toast.success("Data updated successfully!", {
          className: "bg-black text-yellow-500",
          progressClassName: "bg-blue-600",
        });
        console.log(
          "UpdateStudent Status: ",
          action.payload ? action.payload.status : "No payload"
        );
        navigate("/students");
      } else if (updateStudent.rejected.match(action)) {
        toast.error(
          "An error occurred while trying to update the data, the event was reported. Please try again later."
        );
        console.log(
          "UpdateStudent Status: ",
          action.payload ? action.payload.status : "No payload"
        );
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="flex flex-col items-center justify-center w-full max-w-2xl px-4 py-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Update Student Information</h2>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 flex items-center justify-center">
            <label
              htmlFor="name"
              className="block text-md font-medium text-gray-700"
            >
              Full Name
            </label>
          </div>
          <div className="col-span-2">
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              className="w-[100%] text-lg px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            />
            {errors.name && (
              <p className="text-red-500 font-bold">{errors.name}</p>
            )}
          </div>

          <div className="col-span-1 flex items-center justify-center">
            <label
              htmlFor="username"
              className="block text-md font-medium text-gray-700"
            >
              User Name
            </label>
          </div>
          <div className="col-span-2">
            <input
              type="text"
              id="username"
              name="username"
              value={values.username}
              onChange={handleChange}
              className="w-[100] text-lg px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            />
            {errors.username && (
              <p className="text-red-500 font-bold">{errors.username}</p>
            )}
          </div>

          <div className="col-span-1 flex items-center justify-center">
            <label
              htmlFor="email"
              className="block text-md font-medium text-gray-700"
            >
              Email
            </label>
          </div>
          <div className="col-span-2">
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              className="w-[100] text-lg px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            />
            {errors.email && (
              <p className="text-red-500 font-bold">{errors.email}</p>
            )}
          </div>

          <div className="col-span-1 flex items-center justify-center">
            <label
              htmlFor="street"
              className="block text-md font-medium text-gray-700"
            >
              Street
            </label>
          </div>
          <div className="col-span-2">
            <input
              type="text"
              id="street"
              name="street"
              value={values.street}
              onChange={handleChange}
              className="w-[100] text-lg px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            />
            {errors.street && (
              <p className="text-red-500 font-bold">{errors.street}</p>
            )}
          </div>

          <div className="col-span-1 flex items-center justify-center">
            <label
              htmlFor="suite"
              className="block text-md font-medium text-gray-700"
            >
              Suite
            </label>
          </div>
          <div className="col-span-2">
            <input
              type="text"
              id="suite"
              name="suite"
              value={values.suite}
              onChange={handleChange}
              className="w-[100] text-lg px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            />
            {errors.suite && (
              <p className="text-red-500 font-bold">{errors.suite}</p>
            )}
          </div>

          <div className="col-span-1 flex items-center justify-center">
            <label
              htmlFor="city"
              className="block text-md font-medium text-gray-700"
            >
              City
            </label>
          </div>
          <div className="col-span-2">
            <input
              type="text"
              id="city"
              name="city"
              value={values.city}
              onChange={handleChange}
              className="w-[100] text-lg px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            />
            {errors.city && (
              <p className="text-red-500 font-bold">{errors.city}</p>
            )}
          </div>

          <div className="col-span-1 flex items-center justify-center">
            <label
              htmlFor="zipcode"
              className="block text-md font-medium text-gray-700"
            >
              Zip Code
            </label>
          </div>
          <div className="col-span-2">
            <input
              type="text"
              id="zipcode"
              name="zipcode"
              value={values.zipcode}
              onChange={handleChange}
              className="w-[100] text-lg px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            />
            {errors.zipcode && (
              <p className="text-red-500 font-bold">{errors.zipcode}</p>
            )}
          </div>

          <div className="col-span-1 flex items-center justify-center">
            <label
              htmlFor="latitude"
              className="block text-md font-medium text-gray-700"
            >
              Latitude
            </label>
          </div>
          <div className="col-span-2">
            <input
              type="text"
              id="latitude"
              name="latitude"
              value={values.latitude}
              onChange={handleChange}
              className="w-[100] text-lg px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            />
            {errors.latitude && (
              <p className="text-red-500 font-bold">{errors.latitude}</p>
            )}
          </div>

          <div className="col-span-1 flex items-center justify-center">
            <label
              htmlFor="longitude"
              className="block text-md font-medium text-gray-700"
            >
              Longitude
            </label>
          </div>
          <div className="col-span-2">
            <input
              type="text"
              id="longitude"
              name="longitude"
              value={values.longitude}
              onChange={handleChange}
              className="w-[100] text-lg px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            />
            {errors.longitude && (
              <p className="text-red-500 font-bold">{errors.longitude}</p>
            )}
          </div>

          <div className="col-span-1 flex items-center justify-center">
            <label
              htmlFor="phoneNumber"
              className="block text-md font-medium text-gray-700"
            >
              Phone Number
            </label>
          </div>
          <div className="col-span-2">
            <input
              type="phone"
              id="phoneNumber"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
              className="w-[100] text-lg px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 font-bold">{errors.phoneNumber}</p>
            )}
          </div>

          <div className="col-span-1 flex items-center justify-center">
            <label
              htmlFor="companyName"
              className="block text-md font-medium text-gray-700"
            >
              Company Name
            </label>
          </div>
          <div className="col-span-2">
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={values.companyName}
              onChange={handleChange}
              className="w-[100] text-lg px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            />
            {errors.companyName && (
              <p className="text-red-500 font-bold">{errors.companyName}</p>
            )}
          </div>

          <div className="col-span-1 flex items-center justify-center">
            <label
              htmlFor="companyAddress"
              className="block text-md font-medium text-gray-700"
            >
              Company Address
            </label>
          </div>
          <div className="col-span-2">
            <input
              type="text"
              id="companyAddress"
              name="companyAddress"
              value={values.companyAddress}
              onChange={handleChange}
              className="w-[100] text-lg px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            />
            {errors.companyAddress && (
              <p className="text-red-500 font-bold">{errors.companyAddress}</p>
            )}
          </div>
        </div>

        <div className="space-x-4 mt-6">
          <button
            onClick={update}
            className="px-4 py-2 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update
          </button>
          <button
            onClick={() => navigate("/students")}
            className="px-4 py-2 text-base font-medium text-white bg-yellow-600 rounded-md hover:bg-yellow-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditStudent;
