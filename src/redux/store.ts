import { configureStore } from "@reduxjs/toolkit";
import recordsReducer from "./recordsReducer";
import userReducer from "./userReducer";
const store = configureStore({
  reducer: {
    user: userReducer,
    records: recordsReducer,
  },
});

export default store;
