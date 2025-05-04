import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
const API_BASE_URL = import.meta.env.VITE_SERVER_ROUTE;

export const register = createAsyncThunk(
  "user/register",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        formData
      );

      if (response.statusText === "OK") {
        toast.success("User Registration Successful");
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
      toast.error("User Registration Failed");
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const login = createAsyncThunk(
  "user/login",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        formData,
        { withCredentials: true }
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
export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/logout`);
    if (response.statusText === "OK") {
      toast.success("User logged Out");
      window.location.reload();
      return response.data;
    }
    toast.errpr("Failed to logged Out");
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    console.log(message);
    return thunkAPI.rejectWithValue(message);
  }
});

export const getSingleUser = createAsyncThunk(
  "user/getSingleUser",
  async (_, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/getSingleUser`
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
export const deleteUser = createAsyncThunk(
  "user/deleteUser/:id",
  async (id, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/deleteUser/${id}`
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
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/updateUser`,
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
export const updateUserAvatar = createAsyncThunk(
  "user/updateUserAvatar",
  async (avatar, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/updateUserAvatar`,
        avatar
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

export const forgetPassword = createAsyncThunk(
  "user/forgetPassword",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/forgetPassword`,
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
export const resetPassword = createAsyncThunk(
  "user/resetPassword/:resetToken",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/resetPassword/:resetToken`,
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
export const refreshAccessToken = createAsyncThunk(
  "user/refreshAccessToken",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/refreshAccessToken`,
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
export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/changePassword`,
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
export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/getCurrentUser`,
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

export const getUserLoginStatus = createAsyncThunk(
  "user/getUserLoginStatus",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/auth/loggedIn`, {
        withCredentials: true,
      });
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
