import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_SERVER_ROUTE;

export const addOrder = createAsyncThunk(
  "order/addOrder",
  async ({ formData, productId }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/order/addOrder/${productId}`,
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
export const deleteOrder = createAsyncThunk(
  "order/deleteOrder",
  async (orderId, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/order/deleteOrder/${orderId}`
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
export const getOrdersByUser = createAsyncThunk(
  "order/getOrderByUser",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/order/getUserOrder`
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
export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/order/getAllOrder`);
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
