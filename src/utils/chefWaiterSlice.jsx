import { createSlice } from "@reduxjs/toolkit";

const chefWaiterSlcie = createSlice({
  name: "chefWaiter",
  initialState: [],
  reducers: {
    addChefWaiter: (state, action) => {
      return action.payload;
    },
    removeChefWaiter: (state, action) => {
      return null;
    },
  },
});

export const { addChefWaiter, removeChefWaiter } = chefWaiterSlcie.actions;

export default chefWaiterSlcie.reducer;
