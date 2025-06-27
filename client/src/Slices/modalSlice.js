import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  authState: 0,
};

// login = 0
// signup = 1
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    displayModal(state) {
      state.isModalOpen = true;
    },
    hideModal(state) {
      state.isModalOpen = false;
    },
    changeAuthState(state, action) {
      state.authState = action.payload;
    },
  },
});

export const { displayModal, hideModal, changeAuthState } = modalSlice.actions;

export default modalSlice.reducer;
