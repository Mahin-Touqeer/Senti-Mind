import modalSlice from "./Slices/modalSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    modal: modalSlice,
  },
});
export default store;
