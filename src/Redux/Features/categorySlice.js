import { createSlice } from "@reduxjs/toolkit";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
} from "../Services/categoryServices";

const initialState = {
  isLoading: false,
  isError: false,
  categories: [],
};

const categorySlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (Builder) => {
    Builder.addCase(addCategory.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(addCategory.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.isError = true;
      })
      .addCase(addCategory.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isLoggedIn = false;
      })
      .addCase(getAllCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllCategories.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.isError = true;
      })
      .addCase(getAllCategories.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isLoggedIn = false;
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.isError = true;
      })
      .addCase(deleteCategory.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isLoggedIn = false;
      });
  },
});

export const selectIsLoadingState = (state) => state.product.isLoading;
export const selectIsErrorState = (state) => state.product.isError;
export const selectIsSuccessState = (state) => state.product.isSuccess;
export default categorySlice.reducer;

