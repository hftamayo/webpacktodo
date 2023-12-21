import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function DetailStudent() {
  const [user, setUser] = useState();

  useEffect(() => {
    axios.get(`http://localhost:3004/students/${id}`).then((response) => {
      setUser(response.data);
    });
  }, [user]);

  const { id } = useParams();
  return <div>{user && (
    <h1>{user.name}</h1>
  )}</div>;
}

export default DetailStudent;
