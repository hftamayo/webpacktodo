import dotenv from "dotenv";
import { createSlice } from "@reduxjs/toolkit";

const dialogSlice = createSlice({
  name: "dialog",
  initialState: {
    isOpen: false,
    title: "",
    message: "",
    activeLanguage: process.env.ACTIVE_LANGUAGE || "en",
    entityName: "",
  },
  reducers: {
    openDialog(state, action) {
      state.isOpen = true;
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.entityName = action.payload.entityName;
    },
    closeDialog(state) {
      state.isOpen = false;
      state.title = "";
      state.message = "";
      state.entityName = "";
    },
    setActiveLanguage(state, action) {
      state.activeLanguage = action.payload;
    },
  },
});

export const { openDialog, closeDialog, setActiveLanguage } =
  dialogSlice.actions;

export default dialogSlice.reducer;
