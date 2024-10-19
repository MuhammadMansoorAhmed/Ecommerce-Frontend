import { createSlice } from "@reduxjs/toolkit";

import {
  addOrder,
  deleteOrder,
  getAllOrders,
  getOrdersByUser,
} from "../Services/orderServices";

const initialState = {
  isLoading: false,
  isError: false,
  message: "",
  order: [],
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (Builder) => {
    Builder.addCase(getAllOrders.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(getAllOrders.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.products = action.payload;
      })
      .addCase(getOrdersByUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrdersByUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getOrdersByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.products = action.payload;
      })
      .addCase(addOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addOrder.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(addOrder.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOrder.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteOrder.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
      });
  },
});

export default orderSlice.reducer;
export const selectIsLoading = (state) => state.order.isLoading;
export const selectIsError = (state) => state.order.isError;
