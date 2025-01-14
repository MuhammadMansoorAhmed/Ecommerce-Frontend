import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`/api/category/addCategory`, formData);
      if (response.statusText === "OK") {
        return response.data;
      }
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
export const addSubCategory = createAsyncThunk(
  "category/addSubCategory",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `/api/category/addSubCategory`,
        formData
      );
      if (response.statusText === "OK") {
        return response.data;
      }
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
export const addSubCategoryTag = createAsyncThunk(
  "category/addSubCategoryTag",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `/api/category/addCategoryTag`,
        formData
      );
      if (response.statusText === "OK") {
        return response.data;
      }
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
        `/api/category/getAllCategories`,
        formData
      );
      if (response.statusText === "OK") {
        return response.data;
      }
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
      const response = await axios.get(`/api/category/deleteCategory/${id}`);
      if (response.statusText === "OK") {
        return response.data;
      }
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
