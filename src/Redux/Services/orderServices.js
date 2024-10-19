import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addOrder = createAsyncThunk(
  "order/addOrder",
  async ({ formData, productId }, thunkAPI) => {
    try {
      const response = await axios.post(
        `/api/order/addOrder/${productId}`,
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
      const response = await axios.delete(`/api/order/deleteOrder/${orderId}`);
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
      const response = await axios.get(`/api/order/getUserOrder`);
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
      const response = await axios.get(`/api/order/getAllOrder`);
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
