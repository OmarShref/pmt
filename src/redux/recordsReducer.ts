import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  records: [
    {
      date: "1/1/2023",
      money: 0,
      type: "income",
      description: "monthly income",
    },
  ],
};

const recordsSlice = createSlice({
  name: "records",
  initialState,
  reducers: {
    setrecords: (state, action) => {
      state.records = action.payload;
    },
  },
});
export const { setrecords } = recordsSlice.actions;
export default recordsSlice.reducer;
