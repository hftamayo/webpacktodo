import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateStudent, getStudent } from "../../store/studentSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

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

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [street, setStreet] = useState("");
  const [suite, setSuite] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");

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
      setName(student.name);
      setUsername(student.username);
      setEmail(student.email);
      setStreet(student.address.street);
      setSuite(student.address.suite);
      setCity(student.address.city);
      setZipcode(student.address.zipcode);
      setLatitude(student.position.lat);
      setLongitude(student.position.lng);
      setPhoneNumber(student.phoneNumber);
      setCompanyName(student.company.companyName);
      setCompanyAddress(student.company.companyAddress);
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const data = {
    id: id,
    name: name,
    username: username,
    email: email,
    address: {
      street: street,
      suite: suite,
      city: city,
      zipcode: zipcode,
    },
    position: {
      lat: parseFloat(latitude),
      lng: parseFloat(longitude),
    },
    phoneNumber: phoneNumber,
    company: {
      companyName: companyName,
      companyAddress: companyAddress,
    },
  };

  const update = (e) => {
    e.preventDefault();
    dispatch(updateStudent(data)).then((action) => {
      if (updateStudent.fulfilled.match(action)) {
        toast.success("Data updated successfully!", {
          className: "bg-black text-yellow-500",
          progressClassName: "bg-blue-600",
        });
        console.log("UpdateStudent Status: ", action.payload.status); // log the status
        navigate("/students");
      } else if (updateStudent.rejected.match(action)) {
        toast.error(
          "An error occurred while trying to update the data, the event was reported. Please try again later."
        );
        console.log("UpdateStudent Status: ", action.payload.status); // log the status
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
              value={name}
              onChange={handleChange}
              className="w-[100%] text-lg px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            />
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
              value={username}
              onChange={handleChange}
              className="w-[100] text-lg px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            />
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
              value={email}
              onChange={handleChange}
              className="w-[100] text-lg px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            />
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
              value={street}
              onChange={handleChange}
              className="w-[100] text-lg px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            />
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
              value={suite}
              onChange={handleChange}
              className="w-[100] text-lg px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            />
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
              value={city}
              onChange={handleChange}
              className="w-[100] text-lg px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            />
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
              value={zipcode}
              onChange={handleChange}
              className="w-[100] text-lg px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            />
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
              value={latitude}
              onChange={handleChange}
              className="w-[100] text-lg px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            />
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
              value={longitude}
              onChange={handleChange}
              className="w-[100] text-lg px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            />
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
              value={phoneNumber}
              onChange={handleChange}
              className="w-[100] text-lg px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            />
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
              value={companyName}
              onChange={handleChange}
              className="w-[100] text-lg px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            />
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
              value={companyAddress}
              onChange={handleChange}
              className="w-[100] text-lg px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
            />
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
