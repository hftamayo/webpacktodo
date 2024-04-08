import { createSlice } from "@reduxjs/toolkit";
import StringMessages from "../../utils/StringMessages";

const dialogSlice = createSlice({
  
  name: "dialog",
  initialState: {
    isOpen: false,
    activeLanguage: process.env.ACTIVE_LANGUAGE || "en",
    title: "",
    message: "",
    entityName: "",
  },
  reducers: {
    openDialog(state, action) {
      state.isOpen = true;
      state.entityName = action.payload.entityName;
      const { title, message } =
        StringMessages.confirmDialog[state.activeLanguage];
      state.title = title;
      state.message = message;
    },
    closeDialog(state) {
      state.isOpen = false;
      state.title = "";
      state.message = "";
      state.entityName = "";
    },
    setActiveLanguage(state, action) {
      state.activeLanguage = action.payload;
      const { title, message } =
        StringMessages.confirmDialog[state.activeLanguage];
      state.title = title;
      state.message = message;
    },
  },
});

export const { openDialog, closeDialog, setActiveLanguage } =
  dialogSlice.actions;

export default dialogSlice.reducer;
