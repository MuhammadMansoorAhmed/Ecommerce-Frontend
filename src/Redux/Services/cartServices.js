import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const API_BASE_URL = import.meta.env.VITE_SERVER_ROUTE;

export const AddtoCart = createAsyncThunk(
  "cart/addToCart",
  async (productId, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/cart/addItemToTheCart/${productId}`
      );

      if (response.statusText === "OK") {
        toast.success("Product added to the Cart");
        return response.data;
      }
      if (response.status === 409) {
        toast.info("Product Already exist");
        return;
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      //   console.log(message);
      if (message === "Product Already exist") {
        toast.info(message);
      } else {
        toast.error(message);
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const RemoveFromCart = createAsyncThunk(
  "cart/RemoveFromCart",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/cart/deleteItemFromCart/${id}`
      );

      if (response.statusText === "OK") {
        toast.success("Removed from cart");
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
      toast.error("Failed to remove from cart");
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllCartItems = createAsyncThunk(
  "cart/getAllCartItems",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/cart/getAllCartItems`
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
      toast.error("Failed To fetch Cart");
      return thunkAPI.rejectWithValue(message);
    }
  }
);
