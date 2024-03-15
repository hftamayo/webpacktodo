import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const pdfReport = createAsyncThunk(
  "report/pdfReport",
  async (report) => {
    const response = await axios.post("http://localhost:3004/reports", report);
    return response.data;
  }
);

export const xlsReport = createAsyncThunk(
  "report/xlsReport",
  async (report) => {
    const response = await axios.post("http://localhost:3004/reports", report);
    return response.data;
  }
);

const initialState = {
  report: [],
  status: "idle",
  error: null,
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    reportAdded(state, action) {
      state.report.push(action.payload);
    },
  },
  extraReducers: {
    [pdfReport.pending]: (state, action) => {
      state.status = "loading";
    },
    [pdfReport.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.report = action.payload;
    },
    [pdfReport.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    [xlsReport.pending]: (state, action) => {
      state.status = "loading";
    },
    [xlsReport.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.report = action.payload;
    },
    [xlsReport.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export default reportSlice.reducer;
