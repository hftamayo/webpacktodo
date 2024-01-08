import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getStudents = createAsyncThunk(
  "students/getStudents",
  async () => {
    const response = await axios.get("http://localhost:3004/students");
    return response.data.reverse();
  }
);

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

export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async (student) => {
    const response = await axios.put(
      `http://localhost:3004/students/${student.id}`,
      student
    );
    return response.data;
  }
);

export const getStudent = createAsyncThunk(
  "students/getStudent",
  async (id) => {
    const response = await axios.get(`http://localhost:3004/students/${id}`);
    return response.data;
  }
);

export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id) => {
    await axios.delete(`http://localhost:3004/students/${id}`);
    return id;
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
      .addCase(getStudents.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];
        state.error = null;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(addStudent.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (Array.isArray(action.payload)) {
          state.students = state.students.concat(action.payload);
        } else {
          state.students.push(action.payload);
        }
        state.error = null;
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(updateStudent.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { id, name, email, phone, address } = action.payload;
        const existingStudent = state.students.find(
          (student) => student.id === id
        );
        if (existingStudent) {
          existingStudent.name = name;
          existingStudent.email = email;
          existingStudent.phone = phone;
          existingStudent.address = address;
        }
        state.error = null;
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(getStudent.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];
        state.error = null;
      })
      .addCase(getStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(deleteStudent.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.students = state.students.filter(
          (student) => student.id !== action.payload
        );
        state.error = null;
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default studentSlice.reducer;
