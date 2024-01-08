import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateStudent, getStudent } from "../../store/studentSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function EditStudent() {
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
    <div className="w-screen h-full flex flex-col justify-center items-center mt-16">
      <h1 className="text-black text-3xl font-semibold font-Montserrat">
        Edit Student
      </h1>

      <form className="w-[80%] h-full flex flex-col justify-center items-center mt-4">
        <div className="flex items-center space-x-4">
          <label
            htmlFor="name"
            className="text-black font-semibold font-Inter text-xl"
          >
            Full Name
          </label>
          <input
            value={name}
            autoFocus={true}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label
            htmlFor="username"
            className="text-black font-semibold font-Inter text-xl"
          >
            User Name
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="User name"
            className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label
            htmlFor="email"
            className="text-black font-semibold font-Inter text-xl"
          >
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label
            htmlFor="street"
            className="text-black font-semibold font-Inter text-xl"
          >
            Street
          </label>
          <input
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            type="text"
            placeholder="Street"
            className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label
            htmlFor="suite"
            className="text-black font-semibold font-Inter text-xl"
          >
            Suite/Apartment
          </label>
          <input
            value={suite}
            onChange={(e) => setSuite(e.target.value)}
            type="text"
            placeholder="Suite/Apt"
            className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label
            htmlFor="city"
            className="text-black font-semibold font-Inter text-xl"
          >
            City
          </label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            type="text"
            placeholder="City"
            className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label
            htmlFor="zipcode"
            className="text-black font-semibold font-Inter text-xl"
          >
            ZIP Code
          </label>
          <input
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
            type="text"
            placeholder="Zipcode"
            className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label
            htmlFor="latitude"
            className="text-black font-semibold font-Inter text-xl"
          >
            Latitude
          </label>
          <input
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            type="text"
            placeholder="Latitude"
            className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label
            htmlFor="longitude"
            className="text-black font-semibold font-Inter text-xl"
          >
            Longitude
          </label>
          <input
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            type="text"
            placeholder="Longitude"
            className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label
            htmlFor="phoneNumber"
            className="text-black font-semibold font-Inter text-xl"
          >
            Phone Number
          </label>
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="phone"
            placeholder="Phone Number"
            className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label
            htmlFor="companyName"
            className="text-black font-semibold font-Inter text-xl"
          >
            Company's Name
          </label>
          <input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            type="text"
            placeholder="Company's name"
            className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
          />
        </div>

        <div className="flex items-center space-x-4">
          <label
            htmlFor="companyAddress"
            className="text-black font-semibold font-Inter text-xl"
          >
            Comapny's Address
          </label>
          <input
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
            type="text"
            placeholder="Company's address"
            className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
          />
        </div>

        <div className="w-screen h-full flex justify-center items-center space-x-4 mt-16">
          <button
            onClick={update}
            className="w-[25%] bg-green-600 text-xl text-white font-Montserrat font-normal py-4 pl-6 rounded-md"
          >
            Update
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

export default EditStudent;
