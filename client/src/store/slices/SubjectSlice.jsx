import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import QueryString from "qs";
import axiosInstance from "~/api/AxiosInstance";

export const fetchSubjects = createAsyncThunk(
  "subject/fetchSubjects",
  async ({ search, sortBy, sortOrder, page, perPage, filters }) => {
    const query = QueryString.stringify({
      search,
      sortBy,
      sortOrder,
      page,
      perPage,
      filters,
    });
    const response = await axiosInstance.get(`/subjects?${query}`);
    return response.data;
  }
);

export const createSubject = createAsyncThunk(
  "subject/createSubject",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/subjects", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateSubject = createAsyncThunk(
  "subject/updateSubject",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/subjects/${data.id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteSubject = createAsyncThunk(
  "subject/deleteSubject",
  async (id) => {
    const response = await axiosInstance.delete(`/subjects/${id}`);
    return response.data;
  }
);

export const importSubjects = createAsyncThunk(
  "subject/importSubjects",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/subjects/import", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const subjectSlice = createSlice({
  name: "subject",
  initialState: {
    items: [],
    pagination: {
      total: 0,
    },
    loadingFetch: false,
    loadingForm: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjects.pending, (state) => {
        state.loadingFetch = true;
        state.error = null;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.loadingFetch = false;
        const { items, pagination } = action.payload.data;
        state.items = items;
        state.pagination = pagination;
      })
      .addCase(fetchSubjects.rejected, (state) => {
        state.loadingFetch = false;
      })
      .addCase(createSubject.pending, (state) => {
        state.loadingForm = true;
      })
      .addCase(createSubject.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loadingForm = false;
      })
      .addCase(createSubject.rejected, (state) => {
        state.loadingForm = false;
      })
      .addCase(updateSubject.pending, (state) => {
        state.loadingForm = true;
      })
      .addCase(updateSubject.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.id === action.payload.data.id ? action.payload.data : item
        );
        state.loadingForm = false;
      })
      .addCase(updateSubject.rejected, (state) => {
        state.loadingForm = false;
      })
      .addCase(deleteSubject.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.data.id
        );
        state.pagination.total -= 1;
      });
  },
});

export const subjectReducer = subjectSlice.reducer;
