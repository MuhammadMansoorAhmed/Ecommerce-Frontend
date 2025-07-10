import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_SERVER_ROUTE;

export const addProductReview = createAsyncThunk(
  "/:productId/addProductReview",
  async ({ productId, data }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/product/${productId}/addProductReview`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Use status code instead of statusText for consistency
        return response.data;
      } else {
        return thunkAPI.rejectWithValue("Failed to add product Review");
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProductReview = createAsyncThunk(
  "/:productId/updateProductReview",
  async ({ productId, data }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/product/${productId}/updateProductReview`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Use status code instead of statusText for consistency
        return response.data;
      } else {
        return thunkAPI.rejectWithValue("Failed to update product Review");
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProductReview = createAsyncThunk(
  "/:productId/removeReviewByUser",
  async ({ productId }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/product/${productId}/removeReviewByUser`
      );

      if (response.status === 200) {
        // Use status code instead of statusText for consistency
        return response.data;
      } else {
        return thunkAPI.rejectWithValue("Failed to delete product Review");
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProductReviews = createAsyncThunk(
  "/:productId/getProductReviews",
  async ({ productId }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/product/${productId}/getProductReviews`
      );

      if (response.status === 200) {
        // Use status code instead of statusText for consistency
        return response.data;
      } else {
        return thunkAPI.rejectWithValue("Failed to fetch product Review");
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.error(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
