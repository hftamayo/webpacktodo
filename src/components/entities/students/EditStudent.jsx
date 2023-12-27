import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

  const loadUser = async () => {
    axios.get(`http://localhost:3004/students/${id}`).then((response) => {
      setName(response.data.name);
      setUsername(response.data.username);
      setEmail(response.data.email);
      setStreet(response.data.street);
      setSuite(response.data.suite);
      setCity(response.data.city);
      setZipcode(response.data.zipcode);
      setLatitude(response.data.latitude);
      setLongitude(response.data.longitude);
      setPhoneNumber(response.data.phoneNumber);
      setCompanyName(response.data.companyName);
      setCompanyAddress(response.data.companyAddress);
    });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const data = {
    name: name,
    username: username,
    email: email,
    street: street,
    suite: suite,
    city: city,
    zipcode: zipcode,
    latitude: latitude,
    longitude: longitude,
    phoneNumber: phoneNumber,
    companyName: companyName,
    companyAddress: companyAddress,
  };

  const update = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3004/students/${id}`, data)
      .then(navigate("/students"));
  };

  return (
    <div className="w-screen h-full flex flex-col justify-center items-center mt-16">
      <h1 className="text-black text-3xl font-semibold font-Montserrat">
        Edit Student
      </h1>

      <form className="w-[80%] h-full flex flex-col justify-center items-center mt-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
          className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
        />

        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="User name"
          className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
        />

        <input
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          type="text"
          placeholder="Street"
          className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
        />

        <input
          value={suite}
          onChange={(e) => setSuite(e.target.value)}
          type="text"
          placeholder="Suite/Apt"
          className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
        />

        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          type="text"
          placeholder="City"
          className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
        />

        <input
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
          type="text"
          placeholder="Zipcode"
          className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
        />

        <input
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          type="text"
          placeholder="Latitude"
          className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
        />

        <input
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          type="text"
          placeholder="Longitude"
          className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
        />

        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          type="phone"
          placeholder="Phone Number"
          className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
        />

        <input
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          type="text"
          placeholder="Company's name"
          className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
        />

        <input
          value={companyAddress}
          onChange={(e) => setCompanyAddress(e.target.value)}
          type="text"
          placeholder="Company's address"
          className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
        />

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
