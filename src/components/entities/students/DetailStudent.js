import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getStudent } from "../../store/studentSlice";

function DetailStudent() {
  const { id } = useParams();
  const studentId = Number.parseInt(id);
  const dispatch = useDispatch();
  const student = useSelector((state) =>
    state.students.students.find((student) => student.id === studentId)
  );

  useEffect(() => {
    if (!student) {
      dispatch(getStudent(id));
    }
  }, [dispatch, id, student]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div>
        <h1 className="text-blue-500 text-3xl font-semibold font-Montserrat mt-8">
          <Link to="/students">Go back</Link>
        </h1>
      </div>

      <div className="w-[750px] h-[425px] flex justify-center items-center px-6 py-4 border border-black mt-16">
        <div className="w-5/12 flex flex-col space-y-4">
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            Badge
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            Full Name
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            User Name
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            Email
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            Street
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            Suite
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            City
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            Zip Code
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            X
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            Y
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            Phone Number
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            Company's Name
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            Address
          </h2>
        </div>

        <div className="w-7/12 flex flex-col space-y-4">
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            {student?.id}
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            {student?.name}
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            {student?.username}
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            {student?.email}
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            {student?.address.street}
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            {student?.address.suite}
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            {student?.address.city}
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            {student?.address.zipcode}
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            {student?.position.lat}
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            {student?.position.lng}
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            {student?.phoneNumber}
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            {student?.company.name}
          </h2>
          <h2 className="text-black font-semibold font-Inter text-2xl border-b border-black">
            {student?.company.address}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default DetailStudent;
