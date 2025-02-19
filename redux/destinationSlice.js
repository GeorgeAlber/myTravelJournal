import { createSlice } from "@reduxjs/toolkit";

const destinationSlice = createSlice({
  name: "destinations",
  initialState: [],
  reducers: {
    setDestinations: (state, action) => {
      return action.payload;
    },
  },
});

export const { setDestinations, addDestination } = destinationSlice.actions;

export default destinationSlice.reducer;
