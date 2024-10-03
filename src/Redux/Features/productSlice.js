import { createSlice } from "@reduxjs/toolkit";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
  updateProductImages,
  updateProductStock,
} from "../Services/productServices";

const initialState = {
  isLoading: false,
  isError: false,
  message: "",
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (Builder) => {
    Builder.addCase(getAllProducts.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(getAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.products = action.payload;
      })
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(updateProductImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductImages.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateProductImages.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(updateProductStock.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductStock.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateProductStock.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
      });
  },
});

export default productSlice.reducer;
