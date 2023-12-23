import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddStudent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const data = {
    name: name,
    email: email,
    phone: phone,
  };

  const submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3004/students", data)
      .then(navigate("/students"));
  };

  return (
    <div className="w-screen h-full flex flex-col justify-center items-center mt-16">
      <h1 className="text-black text-3xl font-semibold font-Montserrat">
        AddStudent
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
        />

        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="phone"
          placeholder="Phone Number"
          className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
        />
        <div className="w-screen h-full flex justify-center items-center space-x-4 mt-16">
          <button
            onClick={submit}
            className="w-[25%] bg-green-600 text-xl text-white font-Montserrat font-normal py-4 pl-6 rounded-md"
          >
            Add
          </button>
          <button
            onClick={submit}
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
