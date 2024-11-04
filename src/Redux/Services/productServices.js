import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`/api/product/addProduct`, formData);
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
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/api/product/updateProduct/:id`,
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
export const updateProductImages = createAsyncThunk(
  "product/updateProductImages",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/api/product/updateProductImages/:id`,
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
export const updateProductStock = createAsyncThunk(
  "product/updateProductStock",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.patch(
        `/api/product/updateProductStock/:id`,
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
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (selectedProductId, thunkAPI) => {
    try {
      console.log(selectedProductId);

      const response = await axios.delete(
        `/api/product/deleteProduct/${selectedProductId}`
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
export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/api/product/getAllProducts`);
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
export const getProductsWithCategory = createAsyncThunk(
  "product/getProductsByCategory",
  async (category, thunkAPI) => {
    try {
      const response = await axios.get(
        `/api/product/getProductByCategory/${category}`
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
export const getTotalProductsStats = createAsyncThunk(
  "product/getTotalProductsStats",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/api/product/stats/overview`);
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
export const getTotalProductsCategoryStats = createAsyncThunk(
  "product/getTotalProductsCategoryStats",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/api/product/stats/categories`);
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
export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/api/product/getProductById/${id}`);
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
