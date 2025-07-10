import { createSlice } from "@reduxjs/toolkit";
import {
  addProductReview,
  deleteProductReview,
  getProductReviews,
  updateProductReview,
} from "../Services/productReviewServices";

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  productReviews: [],
};

const productReviewSlice = createSlice({
  name: "productReeviews",
  initialState: initialState,
  reducers: {},
  extraReducers: (Builder) => {
    Builder.addCase(getProductReviews.pending, (state) => {
      (state.isError = false),
        (state.isLoading = true),
        (state.isSuccess = true);
    })
      .addCase(getProductReviews.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productReviews = action.payload;
      })
      .addCase(updateProductReview.pending, (state) => {
        (state.isError = false),
          (state.isLoading = true),
          (state.isSuccess = true);
      })
      .addCase(updateProductReview.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(updateProductReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productReviews = action.payload;
      })
      .addCase(deleteProductReview.pending, (state) => {
        (state.isError = false),
          (state.isLoading = true),
          (state.isSuccess = true);
      })
      .addCase(deleteProductReview.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(deleteProductReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productReviews = action.payload;
      })
      .addCase(addProductReview.pending, (state) => {
        (state.isError = false),
          (state.isLoading = true),
          (state.isSuccess = true);
      })
      .addCase(addProductReview.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(addProductReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.productReviews = action.payload;
      });
  },
});

export default productReviewSlice.reducer;
export const selectIsLoading = (state) => state.reviewsReducer.isLoading;
export const selectIsSuccess = (state) => state.reviewsReducer.isSuccess;
export const selectIsError = (state) => state.reviewsReducer.isError;
