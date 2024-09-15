import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import QueryString from "qs";
import axiosInstance from "~/api/AxiosInstance";

export const fetchLecturers = createAsyncThunk(
  "lecturer/fetchLecturers",
  async ({ search, sortBy, sortOrder, page, perPage, filters }) => {
    const query = QueryString.stringify({
      search,
      sortBy,
      sortOrder,
      page,
      perPage,
      filters,
    });
    const response = await axiosInstance.get(`/lecturers?${query}`);
    return response.data;
  }
);

export const createLecturer = createAsyncThunk(
  "lecturer/createLecturer",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/lecturers", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateLecturer = createAsyncThunk(
  "lecturer/updateLecturer",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/lecturers/${data.id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteLecturer = createAsyncThunk(
  "lecturer/deleteLecturer",
  async (id) => {
    const response = await axiosInstance.delete(`/lecturers/${id}`);
    return response.data;
  }
);

const lecturerSlice = createSlice({
  name: "lecturer",
  initialState: {
    items: [],
    pagination: {
      total: 0,
    },
    loadingFetch: false,
    loadingForm: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLecturers.pending, (state) => {
        state.loadingFetch = true;
        state.error = null;
      })
      .addCase(fetchLecturers.fulfilled, (state, action) => {
        state.loadingFetch = false;
        const { items, pagination } = action.payload.data;
        state.items = items;
        state.pagination = pagination;
      })
      .addCase(fetchLecturers.rejected, (state, action) => {
        state.loadingFetch = false;
        state.error = action.error.message;
      })
      .addCase(createLecturer.pending, (state) => {
        state.loadingForm = true;
        state.error = null;
      })
      .addCase(createLecturer.fulfilled, (state, action) => {
        state.loadingForm = false;
        state.items.push(action.payload.data);
        state.pagination.total += 1;
      })
      .addCase(createLecturer.rejected, (state, action) => {
        state.loadingForm = false;
        state.error = action.error.message;
      })
      .addCase(updateLecturer.pending, (state) => {
        state.loadingForm = true;
        state.error = null;
      })
      .addCase(updateLecturer.fulfilled, (state, action) => {
        state.loadingForm = false;
        state.items = state.items.map((item) =>
          item.id === action.payload.data.id ? action.payload.data : item
        );
      })
      .addCase(updateLecturer.rejected, (state, action) => {
        state.loadingForm = false;
        state.error = action.error.message;
      })
      .addCase(deleteLecturer.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.data.id
        );
        state.pagination.total -= 1;
      });
  },
});

export const lecturerReducer = lecturerSlice.reducer;
