import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isLoading: false,
  isError: false,
  categories: [],
};

const categorySlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default categorySlice.reducer;
