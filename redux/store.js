import { configureStore } from "@reduxjs/toolkit";
import destinationReducer from "./destinationSlice";

export const store = configureStore({
  reducer: {
    destinations: destinationReducer,
  },
});
