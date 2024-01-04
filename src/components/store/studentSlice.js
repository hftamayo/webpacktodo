import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getStudent = createAsyncThunk("students/getStudent", async () => {
  const response = await axios.get("http://localhost:3004/students");
  return response.data.reverse();
});

export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (student) => {
    const response = await axios.post(
      "http://localhost:3004/students",
      student
    );
    return response.data;
  }
);

const initialState = {
  students: [],
  status: "idle",
  error: null,
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = Array.isArray(action.payload) ? action.payload : [action.payload];
      })
      .addCase(getStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addStudent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students.push(action.payload);
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default studentSlice.reducer;
