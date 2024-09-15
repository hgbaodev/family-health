import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import QueryString from "qs";
import axiosInstance from "~/api/AxiosInstance";

export const fetchMajors = createAsyncThunk(
  "major/fetchMajors",
  async ({ search, sortBy, sortOrder, page, perPage, filters }) => {
    const query = QueryString.stringify({
      search,
      sortBy,
      sortOrder,
      page,
      perPage,
      filters,
    });

    const response = await axiosInstance.get(`/majors?${query}`);
    return response.data;
  }
);

export const createMajor = createAsyncThunk(
  "major/createMajor",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/majors", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateMajor = createAsyncThunk(
  "major/updateMajor",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/majors/${data.id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteMajor = createAsyncThunk("major/deleteMajor", async (id) => {
  const response = await axiosInstance.delete(`/majors/${id}`);
  return response.data;
});

const majorSlice = createSlice({
  name: "major",
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
      .addCase(fetchMajors.pending, (state) => {
        state.loadingFetch = true;
        state.error = null;
      })
      .addCase(fetchMajors.fulfilled, (state, action) => {
        state.loadingFetch = false;
        const { items, pagination } = action.payload.data;
        state.items = items;
        state.pagination = pagination;
      })
      .addCase(fetchMajors.rejected, (state, action) => {
        state.loadingFetch = false;
        state.error = action.error.message;
      })
      .addCase(createMajor.pending, (state) => {
        state.loadingForm = true;
        state.error = null;
      })
      .addCase(createMajor.fulfilled, (state, action) => {
        state.loadingForm = false;
        state.items.push(action.payload.data);
        state.pagination.total += 1;
      })
      .addCase(createMajor.rejected, (state, action) => {
        state.loadingForm = false;
        state.error = action.error.message;
      })
      .addCase(updateMajor.pending, (state) => {
        state.loadingForm = true;
        state.error = null;
      })
      .addCase(updateMajor.fulfilled, (state, action) => {
        state.loadingForm = false;
        state.items = state.items.map((item) =>
          item.id === action.payload.data.id ? action.payload.data : item
        );
      })
      .addCase(updateMajor.rejected, (state, action) => {
        state.loadingForm = false;
        state.error = action.error.message;
      })
      .addCase(deleteMajor.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.data.id
        );
        state.pagination.total -= 1;
      });
  },
});

export const majorReducer = majorSlice.reducer;
