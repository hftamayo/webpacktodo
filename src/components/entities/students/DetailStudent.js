import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function DetailStudent() {
  const [user, setUser] = useState();

  useEffect(() => {
    axios.get(`http://localhost:3004/students/${id}`).then((response) => {
      setUser(response.data);
    });
  }, [user]);

  const { id } = useParams();
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div>
        <h1 className="text-blue-500 text-3xl font-semibold font-Montserrat mt-4">
          <Link to="/students">Go back</Link>
        </h1>
      </div>

      <div className="w-[750px] h-[425px] flex justify-center items-center px-6 py-4 border border-black mt-16">
        <div className="w-5/12 flex flex-col space-y-4">
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            Name
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            Email
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            Phone Number
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            Street
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            City
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            Zip Code
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            Company
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            Address
          </h2>
        </div>

        <div className="w-7/12 flex flex-col space-y-4">
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            {user?.name}
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            {user?.email}
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            {user?.phoneNumber}
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            {user?.address.street}
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            {user?.address.city}
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            {user?.address.zipcode}
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            {user?.company.name}
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            {user?.company.address}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default DetailStudent;
