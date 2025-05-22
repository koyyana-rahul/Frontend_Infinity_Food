import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./adminSlice";
import restaurantReducer from "./restaurantSlice";
import chefWaiterReducer from "./chefWaiterSlice";

const appStore = configureStore({
  reducer: {
    admin: adminReducer,
    restaurant: restaurantReducer,
    chefWaiter: chefWaiterReducer,
  },
});

export default appStore;
