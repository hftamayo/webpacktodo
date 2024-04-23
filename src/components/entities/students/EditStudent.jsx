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

  const handleUpdate = (e) => {
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
    <div className="flex justify-center">
      <form className="w-full max-w-lg">
        <div className="rounded overflow-hidden shadow-lg p-6 bg-white">
          <div className="flex items-center justify-center font-bold text-xl mb-2">
            Update Student's Information
          </div>
          <div>
            <div className="flex flex-wrap -mx-3">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  htmlFor="name"
                  className="block text-md font-medium text-gray-700"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={values.name}
                  autoFocus={true}
                  onChange={handleChange}
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 font-bold border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:font-normal ${
                    errors.username ? "border-red-500" : ""
                  }`}
                ></input>
                {errors.name && (
                  <p className="text-red-500 text-sm italic font-bold bottom-0">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  htmlFor="username"
                  className="block text-md font-medium text-gray-700"
                >
                  User Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 font-bold border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:font-normal ${
                    errors.username ? "border-red-500" : ""
                  }`}
                ></input>
                {errors.username && (
                  <p className="text-red-500 text-sm italic font-bold bottom-0">
                    {errors.username}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  htmlFor="email"
                  className="block text-md font-medium text-gray-700"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 font-bold border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:font-normal ${
                    errors.email ? "border-red-500" : ""
                  }`}
                ></input>
                {errors.email && (
                  <p className="text-red-500 text-sm italic font-bold bottom-0">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  htmlFor="street"
                  className="block text-md font-medium text-gray-700"
                >
                  Street <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={values.street}
                  onChange={handleChange}
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 font-bold border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:font-normal ${
                    errors.street ? "border-red-500" : ""
                  }`}
                ></input>
                {errors.street && (
                  <p className="text-red-500 text-sm italic font-bold bottom-0">
                    {errors.street}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  htmlFor="suite"
                  className="block text-md font-medium text-gray-700"
                >
                  Suite <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="suite"
                  name="suite"
                  value={values.suite}
                  onChange={handleChange}
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 font-bold border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:font-normal ${
                    errors.suite ? "border-red-500" : ""
                  }`}
                ></input>
                {errors.suite && (
                  <p className="text-red-500 text-sm italic font-bold bottom-0">
                    {errors.suite}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  htmlFor="city"
                  className="block text-md font-medium text-gray-700"
                >
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 font-bold border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:font-normal ${
                    errors.city ? "border-red-500" : ""
                  }`}
                ></input>
                {errors.city && (
                  <p className="text-red-500 text-sm italic font-bold bottom-0">
                    {errors.city}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  htmlFor="zipcode"
                  className="block text-md font-medium text-gray-700"
                >
                  Zipcode <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="zipcode"
                  name="zipcode"
                  value={values.zipcode}
                  onChange={handleChange}
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 font-bold border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:font-normal ${
                    errors.zipcode ? "border-red-500" : ""
                  }`}
                ></input>
                {errors.zipcode && (
                  <p className="text-red-500 text-sm italic font-bold bottom-0">
                    {errors.zipcode}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  htmlFor="latitude"
                  className="block text-md font-medium text-gray-700"
                >
                  Latitude <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="latitude"
                  name="latitude"
                  value={values.latitude}
                  onChange={handleChange}
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 font-bold border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:font-normal ${
                    errors.latitude ? "border-red-500" : ""
                  }`}
                ></input>
                {errors.latitude && (
                  <p className="text-red-500 text-sm italic font-bold bottom-0">
                    {errors.latitude}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  htmlFor="longitude"
                  className="block text-md font-medium text-gray-700"
                >
                  Longitude <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="longitude"
                  name="longitude"
                  value={values.longitude}
                  onChange={handleChange}
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 font-bold border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:font-normal ${
                    errors.longitude ? "border-red-500" : ""
                  }`}
                ></input>
                {errors.longitude && (
                  <p className="text-red-500 text-sm italic font-bold bottom-0">
                    {errors.longitude}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  htmlFor="phoneNumber"
                  className="block text-md font-medium text-gray-700"
                >
                  Phone Number<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 font-bold border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:font-normal ${
                    errors.phoneNumber ? "border-red-500" : ""
                  }`}
                ></input>
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm italic font-bold bottom-0">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  htmlFor="companyName"
                  className="block text-md font-medium text-gray-700"
                >
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={values.companyName}
                  onChange={handleChange}
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 font-bold border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:font-normal ${
                    errors.companyName ? "border-red-500" : ""
                  }`}
                ></input>
                {errors.companyName && (
                  <p className="text-red-500 text-sm italic font-bold bottom-0">
                    {errors.companyName}
                  </p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  htmlFor="companyAddress"
                  className="block text-md font-medium text-gray-700"
                >
                  Company Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="companyAddress"
                  name="companyAddress"
                  value={values.companyAddress}
                  onChange={handleChange}
                  className={`appearance-none block w-full bg-gray-200 text-gray-700 font-bold border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:font-normal ${
                    errors.companyAddress ? "border-red-500" : ""
                  }`}
                ></input>
                {errors.companyAddress && (
                  <p className="text-red-500 text-sm italic font-bold bottom-0">
                    {errors.companyAddress}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4 px-4 space-x-4">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 text-base font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
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

export default EditStudent;
