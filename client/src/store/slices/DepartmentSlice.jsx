import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "~/api/AxiosInstance";

export const fetchDepartments = createAsyncThunk(
  "department/fetchDepartments",
  async () => {
    const response = await axiosInstance.get(`/departments`);
    return response.data;
  }
);

const departmentSlice = createSlice({
  name: "department",
  initialState: {
    items: [],
    loadingFetch: false,
    loadingForm: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.loadingFetch = true;
        state.error = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.loadingFetch = false;
        state.items = action.payload.data;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.loadingFetch = false;
        state.error = action.error.message;
      });
  },
});

export const departmentReducer = departmentSlice.reducer;
