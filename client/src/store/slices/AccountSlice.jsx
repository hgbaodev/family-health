import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import QueryString from "qs";
import axiosInstance from "~/api/AxiosInstance";

export const fetchAccounts = createAsyncThunk(
  "account/fetchAccounts",
  async ({ search, sortBy, sortOrder, page, perPage, filters }) => {
    const query = QueryString.stringify({
      search,
      sortBy,
      sortOrder,
      page,
      perPage,
      filters,
    });
    const response = await axiosInstance.get(`/accounts?${query}`);
    return response.data;
  }
);

export const createAccount = createAsyncThunk(
  "account/createAccount",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/accounts", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "account/deleteAccount",
  async (id) => {
    const response = await axiosInstance.delete(`/accounts/${id}`);
    return response.data;
  }
);

const accountSlice = createSlice({
  name: "account",
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
      .addCase(fetchAccounts.pending, (state) => {
        state.loadingFetch = true;
        state.error = null;
      })
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        state.loadingFetch = false;
        const { items, pagination } = action.payload.data;
        state.items = items;
        state.pagination = pagination;
      })
      .addCase(fetchAccounts.rejected, (state, action) => {
        state.loadingFetch = false;
        state.error = action.error.message;
      })
      .addCase(createAccount.pending, (state) => {
        state.loadingForm = true;
        state.error = null;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.loadingForm = false;
        state.items.push(action.payload.data);
        state.pagination.total += 1;
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loadingForm = false;
        state.error = action.error.message;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.data.id
        );
        state.pagination.total -= 1;
      });
  },
});

export const accountReducer = accountSlice.reducer;
