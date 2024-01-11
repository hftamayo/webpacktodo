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
    setValues({ ...values, [name]: value });
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
    id: id,
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
    <div className="w-screen h-full flex flex-col justify-center items-center mt-16">
      <h1 className="text-black text-3xl font-semibold font-Montserrat">
        New Student
      </h1>

      <form className="w-[80%] h-full flex flex-col justify-center items-center mt-4">
        <input
          value={values.name}
          autoFocus={true}
          onChange={handleChange}
          type="text"
          name="name"
          placeholder="Name"
          className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
        />
        {errors.name && <p>{errors.name}</p>}

        <input
          value={values.username}
          onChange={handleChange}
          type="text"
          placeholder="User name"
          className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
        />

        <input
          value={values.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
          className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
        />

        <input
          value={values.street}
          onChange={handleChange}
          type="text"
          placeholder="Street"
          className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
        />

        <input
          value={values.suite}
          onChange={handleChange}
          type="text"
          placeholder="Suite/Apt"
          className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
        />

        <input
          value={values.city}
          onChange={handleChange}
          type="text"
          placeholder="City"
          className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
        />

        <input
          value={values.zipcode}
          onChange={handleChange}
          type="text"
          placeholder="Zipcode"
          className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
        />

        <input
          value={values.latitude}
          onChange={handleChange}
          type="text"
          placeholder="Latitude"
          className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
        />

        <input
          value={values.longitude}
          onChange={handleChange}
          type="text"
          placeholder="Longitude"
          className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
        />

        <input
          value={values.phoneNumber}
          onChange={handleChange}
          type="phone"
          placeholder="Phone Number"
          className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
        />

        <input
          value={values.companyName}
          onChange={handleChange}
          type="text"
          placeholder="Company's name"
          className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
        />

        <input
          value={values.companyAddress}
          onChange={handleChange}
          type="text"
          placeholder="Company's address"
          className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
        />

        <div className="w-screen h-full flex justify-center items-center space-x-4 mt-16">
          <button
            onClick={handleSubmit}
            className="w-[25%] bg-green-600 text-xl text-white font-Montserrat font-normal py-4 pl-6 rounded-md"
          >
            Add
          </button>
          <button
            onClick={() => navigate("/students")}
            className="w-[25%] bg-yellow-600 text-xl text-white font-Montserrat font-normal py-4 pl-6  rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddStudent;
