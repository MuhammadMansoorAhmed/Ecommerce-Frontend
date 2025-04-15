import { createSlice } from "@reduxjs/toolkit";
import {
  changePassword,
  deleteUser,
  forgetPassword,
  getCurrentUser,
  getSingleUser,
  getUserLoginStatus,
  login,
  logout,
  refreshAccessToken,
  register,
  resetPassword,
  updateUser,
  updateUserAvatar,
} from "../Services/authServices";

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  isError: false,
  user: {},
};

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
    Builder.addCase(register.pending, (state) => {
      state.isLoading = true;
    })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.isError = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isLoggedIn = false;
      })
      .addCase(login.pending, (state) => {
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
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.isLoggedIn = false;
      })
      .addCase(getSingleUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleUser.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.isError = true;
      })
      .addCase(getSingleUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.isError = true;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.isError = true;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUserAvatar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserAvatar.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.isError = true;
      })
      .addCase(updateUserAvatar.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(forgetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(forgetPassword.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.isError = true;
      })
      .addCase(forgetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.isError = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(refreshAccessToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.isError = true;
      })
      .addCase(refreshAccessToken.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changePassword.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.isError = true;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.isError = true;
      })
      .addCase(getCurrentUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getUserLoginStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserLoginStatus.rejected, (state) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.isError = true;
      })
      .addCase(getUserLoginStatus.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});

export const selectIsLoadingState = (state) => state.auth.isLoading;
export const selectIsErrorState = (state) => state.auth.isError;
export const selectIsSuccessState = (state) => state.auth.isSuccess;
export default authSlice.reducer;
