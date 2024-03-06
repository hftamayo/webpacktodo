import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addStudent } from "../../store/studentSlice";
import { useDispatch } from "react-redux";

function AddStudent() {
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(values);
    if (Object.keys(errors).length !== 0) {
      setErrors(errors);
      return;
    }

    dispatch(addStudent(data)).then((action) => {
      if (addStudent.fulfilled.match(action)) {
        toast.success("Data added successfully!", {
          className: "bg-black text-yellow-500",
          progressClassName: "bg-blue-600",
        });
        console.log("AddStudent Status: ", action.payload.status); // log the status
        navigate("/students");
      } else if (addStudent.rejected.match(action)) {
        toast.error(
          "An error occurred while trying to save the data, the event was reported. Please try again later."
        );
        console.log("AddStudent Status: ", action.payload.status); // log the status
      }
    });
  };

  return (
    <div className="flex justify-center">
      <form className="w-full max-w-lg">
        <div className="rounded overflow-hidden shadow-lg p-6 bg-white">
          <div className="font-bold text-xl mb-2">Add a Student</div>
          <div>
            <div className="flex flex-wrap -mx-3">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  User Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={values.street}
                  onChange={handleChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                ></input>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  autoFocus={true}
                  onChange={handleChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                ></input>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                ></input>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                ></input>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Register
            </button>
            <button
              onClick={() => navigate("/students")}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddStudent;
