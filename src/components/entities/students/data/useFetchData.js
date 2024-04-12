import { useDispatch } from "react-redux";
import { getStudents } from "../../../store/studentSlice";
import { toast } from "react-toastify";

export default function useFetchData() {
  const dispatch = useDispatch();

  const loadData = async () => {
    try {
      dispatch(getStudents()).then((action) => {
        if (getStudents.fulfilled.match(action)) {
          console.log("Status: succeeded"); // Log the status
        } else if (getStudents.rejected.match(action)) {
          console.log("Status: failed"); // Log the status
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
