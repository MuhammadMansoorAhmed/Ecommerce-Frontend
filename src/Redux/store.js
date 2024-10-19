import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/authSlice";
import productReducer from "./Features/productSlice";
import orderReducer from "./Features/orderSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    order: orderReducer,
  },
});
