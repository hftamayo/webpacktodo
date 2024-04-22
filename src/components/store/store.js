import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./studentSlice";
import dialogReducer from "./dialogSlice";

const store = configureStore({
  reducer: {
    students: studentReducer,
    dialog: dialogReducer,
  },
  //the next line work closely with redux-thunk for async operations
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
