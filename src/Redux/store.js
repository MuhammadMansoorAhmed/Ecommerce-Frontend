import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/authSlice";
import productReducer from "./Features/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});
