import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteStudent, getStudents } from "./studentSlice";
import StringMessages from "../../utils/StringMessages";
import { toast } from "react-toastify";

const deleteEntity = createAsyncThunk(
  "dialog/deleteEntity",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = deleteStudent(id);
      dispatch(getStudents());
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const dialogSlice = createSlice({
  name: "dialog",
  initialState: {
    isOpen: false,
    activeLanguage: process.env.ACTIVE_LANGUAGE || "en",
    title: "",
    message: "",
    entityId: null,
    entityName: "",
    errorMessage: null,
  },
  reducers: {
    openDialog: (state, action) => {
      state.isOpen = true;
      state.entityId = action.payload.id;
      state.entityName = action.payload.entityName;
      const { title, message } =
        StringMessages.confirmDialog[state.activeLanguage];
      state.title = title;
      state.message = message;
    },
    closeDialog: (state) => {
      state.isOpen = false;
      state.title = "";
      state.message = "";
      state.entityId = null;
      state.entityName = "";
    },
    setActiveLanguage: (state, action) => {
      state.activeLanguage = action.payload;
      const { title, message } =
        StringMessages.confirmDialog[state.activeLanguage];
      state.title = title;
      state.message = message;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteEntity.pending, (state) => {
        state.isOpen = true;
      })
      .addCase(deleteEntity.fulfilled, (state) => {
        state.isOpen = false;
        state.title = "";
        state.message = "";
        state.entityId = null;
        state.entityName = "";
        toast.success("Data deleted permanently", {
          className: "bg-black text-yellow-500",
          progressClassName: "bg-blue-600",
        });
      })
      .addCase(deleteEntity.rejected, (state, action) => {
        state.isOpen = false;
        state.title = "";
        state.message = "";
        state.entityId = null;
        state.entityName = "";
        state.errorMessage = action.error.message;
        toast.error(
          "An error occurred while trying to delete the selected data, the event was reported. Please try again later. "
        );
      });
  },
});

export const { openDialog, closeDialog, setActiveLanguage } =
  dialogSlice.actions;

export default dialogSlice.reducer;
