import { createSlice } from "@reduxjs/toolkit";
import {
  AddtoCart,
  getAllCartItems,
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
      .addCase(getAllCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCartItems.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getAllCartItems.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
      });
  },
});

export const selectIsLoadingState = (state) => state.cart.isLoading;
export const selectIsErrorState = (state) => state.cart.isError;
export default cartSlice.reducer;
