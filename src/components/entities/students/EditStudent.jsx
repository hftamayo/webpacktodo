import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditStudent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  const loadUser = async () => {
    axios.get(`http://localhost:3004/students/${id}`).then((response) => {
      setName(response.data.name);
      setEmail(response.data.email);
      setPhone(response.data.phoneNumber);
    });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const data = {
    name: name,
    email: email,
    phone: phone,
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

        <button
          onClick={update}
          className="w-[80%] bg-blue-600 text-xl mt-4 text-white font-Montserrat font-normal py-4 pl-6"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default EditStudent;
