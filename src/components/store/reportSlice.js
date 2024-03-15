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
