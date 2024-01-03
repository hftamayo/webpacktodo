import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
    name: "students",
    initialState: {
        students: []},
    reducers: {
    }
});

export const {} = studentSlice.actions;
export default studentSlice.reducer;