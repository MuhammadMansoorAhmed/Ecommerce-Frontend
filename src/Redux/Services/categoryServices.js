import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_SERVER_ROUTE;

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/category/addCategory`,
        formData
      );
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/category/getAllCategories`,
        formData
      );
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/category/deleteCategory/${id}`
      );
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// export const getAllSubCategories = createAsyncThunk(
//   "category/getAllSubCategories",
//   async (category, thunkAPI) => {
//     try {
//       const response = await axios.get(
//         `/api/category/getAllSubCategories/${category}`
//       );
//       if (response.statusText === "OK") {
//         return response.data;
//       }
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       console.log(message);
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );
