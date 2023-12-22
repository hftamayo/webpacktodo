import React from "react";

function AddStudent() {
  return (
    <div className="w-screen h-full flex flex-col justify-center items-center mt-16">
      <h1 className="text-black text-3xl font-semibold font-Montserrat">
        AddStudent
      </h1>

      <form className="w-[80%] h-full flex flex-col justify-center items-center mt-4">
        <input
          type="text"
          placeholder="Name"
          className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
        />

        <input
          type="phone"
          placeholder="Phone Number"
          className="w-[80%] bg-white/10 text-xl mt-4 font-Montserrat font-normal outline-none py-4 pl-6 border border-zinc-400"
        />

        <button className="w-[80%] bg-blue-600 text-xl mt-4 font-Montserrat font-normal py-4 pl-6">Add</button>
      </form>
    </div>
  );
}

export default AddStudent;
