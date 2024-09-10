import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  isError: false,
  user: {},
};

export const register = createAsyncThunk(
  "user/register",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`/api/auth/register`, formData);
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
export const login = createAsyncThunk(
  "user/login",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`/api/auth/login`, formData);
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
export const logout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    const response = await axios.post(`/api/auth/logout`);
    if (response.statusText === "OK") {
      return response.data;
    }
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
      const response = await axios.post(`/api/auth/getSingleUser`);
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
export const deleteUser = createAsyncThunk(
  "user/deleteUser/:id",
  async (id, thunkAPI) => {
    try {
      const response = await axios.post(`/api/auth/deleteUser/${id}`);
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
export const updateCurrentUser = createAsyncThunk(
  "user/updateUser",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`/api/auth/updateUser`, formData);
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
export const updateUserAvatar = createAsyncThunk(
  "user/updateUserAvatar",
  async (avatar, thunkAPI) => {
    try {
      const response = await axios.post(`/api/auth/updateUserAvatar`, avatar);
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
export const forgetPassword = createAsyncThunk(
  "user/forgetPassword",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`/api/auth/forgetPassword`, formData);
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
export const resetPassword = createAsyncThunk(
  "user/resetPassword/:resetToken",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `/api/auth/resetPassword/:resetToken`,
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
export const refreshAccessToken = createAsyncThunk(
  "user/refreshAccessToken",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `/api/auth/refreshAccessToken`,
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
export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`/api/auth/changePassword`, formData);
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
export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`/api/auth/getCurrentUser`, formData);
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_LOGIN: (state, action) => {
      // console.log(action.payload);
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (Builder) => {
    Builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.isError = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isLoggedIn = true;
        state.user = action.payload;
      });
  },
});

export default authSlice;
