import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./studentSlice";

const store = configureStore({
  reducer: {
    students: studentReducer,
  },
  //the next line work closely with redux-thunk for async operations
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
