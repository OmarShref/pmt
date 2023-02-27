import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  isLogedin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLogedin: (state, action) => {
      if (action.payload === 200) {
        state.isLogedin = true;
      } else {
        state.isLogedin = false;
      }
    },
  },
});
export const { setIsLogedin } = userSlice.actions;
export default userSlice.reducer;
