import { useState } from "react";
import { useDispatch } from "react-redux";
import { getStudents } from "../../../store/studentSlice";
import { toast } from "react-toastify";

export default function useFetchData() {
  const dispatch = useDispatch();
  const [tries, setTries] = useState(0);

  const loadData = async () => {
    if (tries > 3) {
      toast.error(
        "An error occurred while trying to load the data, the event was reported. Please try again later."
      );
      return;
    }

    try {
      dispatch(getStudents()).then((action) => {
        if (getStudents.fulfilled.match(action)) {
          console.log("Status: succeeded"); // Log the status
        } else if (getStudents.rejected.match(action)) {
          console.log("Status: failed");
          setTries((prevTries) => {
            if (prevTries < 3) {
              loadData();
              return prevTries + 1;
            } else {
              console.log("Failed to load data afert 3 attempts");
              toast.error("Failed to load data afert 3 attempts");
              return prevTries;
            }
          }); // Log the status
        }
      });
    } catch (error) {
      toast.error(
        "An error occurred while trying to load the data, the event was reported. Please try again later."
      );
    }
  };

  return loadData;
}
