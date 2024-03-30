import { createSlice } from "@reduxjs/toolkit";

const dialogSlice = createSlice({
    name: "dialog",
    initialState: { isOpen: false, title: "", message: "" },
    reducers: {
        openDialog(state, action) {
            state.isOpen = true;
            state.title = action.payload.title;
            state.message = action.payload.message;
        },
        closeDialog(state) {
            state.isOpen = false;
            state.title = "";
            state.message = "";
        },
    },
});

export const { openDialog, closeDialog } = dialogSlice.actions;

export default dialogSlice.reducer;