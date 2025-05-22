import { createSlice } from "@reduxjs/toolkit";

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState: null, // Must be null to allow conditional fetch
  reducers: {
    addRestaurant: (state, action) => {
      return action.payload;
    },
    removeRestaurant: () => {
      return null;
    },
  },
});

export const { addRestaurant, removeRestaurant } = restaurantSlice.actions;

export default restaurantSlice.reducer;
