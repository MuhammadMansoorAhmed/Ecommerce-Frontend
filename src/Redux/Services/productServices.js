import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_SERVER_ROUTE;

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/product/addProduct`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        // Use status code instead of statusText for consistency
        return response.data;
      } else {
        return thunkAPI.rejectWithValue("Failed to add product");
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

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, formData }, thunkAPI) => {
    console.log("Inspecting FormData inside thunk:");

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}/api/product/updateProduct/${id}`,
        formData
        // {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // }
      );
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log("Error in updateProduct:", message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProductImages = createAsyncThunk(
  "product/updateProductImages",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/api/product/updateProductImages/${id}`,
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
export const updateProductStock = createAsyncThunk(
  "product/updateProductStock",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/api/product/updateProductStock/${id}`,
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
export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (selectedProductId, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/product/deleteProduct/${selectedProductId}`
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
export const getAllProducts = createAsyncThunk(
  "product/getAllProducts",
  async (params, thunkAPI) => {
    try {
      const { page, limit } = params ?? {};
      const response = await axios.get(
        `${API_BASE_URL}/api/product/getAllProducts`,
        { params: { page, limit }, signal: thunkAPI.signal, timeout: 15000 }
      );

      // Keep your original return contract
      const payload = response.data; // { statusCode, data, message } from ApiResponse

      // Non-breaking: attach headers as a helper field
      const h = response.headers || {};
      payload._headers = {
        "x-total-count": h["x-total-count"],
        "x-total-pages": h["x-total-pages"],
        "x-page": h["x-page"],
        "x-limit": h["x-limit"],
        "x-has-next": h["x-has-next"],
        "x-has-prev": h["x-has-prev"],
      };

      return payload;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getProductsWithCategoryId = createAsyncThunk(
  "product/getProductsByCategory",
  async (category, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/product/getProductByCategory/${category}`
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

export const getProductsWithCategoryName = createAsyncThunk(
  "product/getProductsByCategoryName",
  async (arg, thunkAPI) => {
    try {
      // Backward-compatible: accept "cloths" OR { categoryName: "cloths", page, limit }
      const { categoryName, page, limit } =
        typeof arg === "string" ? { categoryName: arg } : arg || {};

      const encoded = encodeURIComponent(categoryName ?? "");
      const response = await axios.get(
        `${API_BASE_URL}/api/product/getProductByCategoryName/${encoded}`,
        { params: { page, limit }, signal: thunkAPI.signal, timeout: 15000 }
      );

      const payload = response.data; // original envelope
      const h = response.headers || {};
      payload._headers = {
        "x-total-count": h["x-total-count"],
        "x-total-pages": h["x-total-pages"],
        "x-page": h["x-page"],
        "x-limit": h["x-limit"],
        "x-has-next": h["x-has-next"],
        "x-has-prev": h["x-has-prev"],
      };
      return payload;
    } catch (error) {
      if (
        axios.isCancel?.(error) ||
        error.name === "CanceledError" ||
        error.code === "ERR_CANCELED"
      ) {
        return thunkAPI.rejectWithValue("Request canceled");
      }
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);



export const getTotalProductsStats = createAsyncThunk(
  "product/getTotalProductsStats",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/product/stats/overview`
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
export const getTotalProductsCategoryStats = createAsyncThunk(
  "product/getTotalProductsCategoryStats",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/product/stats/categories`
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
export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/product/getProductById/${id}`
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
