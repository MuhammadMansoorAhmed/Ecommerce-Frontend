import { createSlice } from "@reduxjs/toolkit";
import {
  AddtoCart,
  getAllCartData,
  getAllCartItemsByUserId,
  RemoveFromCart,
} from "../Services/cartServices";

const initialState = {
  isLoading: false,
  isError: false,
  cart: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (Builder) => {
    Builder.addCase(AddtoCart.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(AddtoCart.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(AddtoCart.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(RemoveFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(RemoveFromCart.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(RemoveFromCart.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getAllCartItemsByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCartItemsByUserId.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getAllCartItemsByUserId.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getAllCartData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCartData.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getAllCartData.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
      });
  },
});

export const selectIsLoadingState = (state) => state.cart.isLoading;
export const selectIsErrorState = (state) => state.cart.isError;
export default cartSlice.reducer;
