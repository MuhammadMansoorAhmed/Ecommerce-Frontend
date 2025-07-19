import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Features/authSlice";
import productReducer from "./Features/productSlice";
import categoryReducer from "./Features/categorySlice";
import orderReducer from "./Features/orderSlice";
import cartReducer from "./Features/cartSlice";
import reviewsReducer from "./Features/productReviewSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    category: categoryReducer,
    order: orderReducer,
    cart: cartReducer,
    reviews: reviewsReducer,
  },
});
