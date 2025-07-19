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
  name: "category",
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
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isLoggedIn = false;
        state.categories = action.payload.data;
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

export const selectIsLoadingState = (state) => state.category.isLoading;
export const selectIsErrorState = (state) => state.category.isError;
export const selectIsSuccessState = (state) => state.category.isSuccess;
export const selectCategories = (state) => state.category.categories;
export default categorySlice.reducer;

