import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "~/api/AxiosInstance";

export const getCurrentTeachingRegistration = createAsyncThunk(
  "teachingRegistration/getCurrentTeachingRegistration",
  async () => {
    const response = await axiosInstance.get(`/teaching-registrations`);
    return response.data;
  }
);

export const createTeachingRegistration = createAsyncThunk(
  "teachingRegistration/createTeachingRegistration",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/teaching-registrations",
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTeachingRegistration = createAsyncThunk(
  "teachingRegistration/updateTeachingRegistration",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/teaching-registrations/${data.id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTeachingRegistration = createAsyncThunk(
  "teachingRegistration/deleteTeachingRegistration",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/teaching-registrations/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSubjectRegistered = createAsyncThunk(
  "teachingRegistration/getListSubjectRegistered",
  async (id) => {
    const response = await axiosInstance.get(
      `/teaching-plans/${id}/registered-subjects`
    );
    return response.data;
  }
);

const teachingRegistrationSlice = createSlice({
  name: "teachingRegistration",
  initialState: {
    data: {},
    loadingFetch: false,
    error: null,
    registered: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentTeachingRegistration.pending, (state) => {
        state.loadingFetch = true;
        state.error = null;
      })
      .addCase(getCurrentTeachingRegistration.fulfilled, (state, action) => {
        state.loadingFetch = false;
        state.data = action.payload.data;
      })
      .addCase(getCurrentTeachingRegistration.rejected, (state, action) => {
        state.loadingFetch = false;
        state.error = action.error.message;
      })
      .addCase(getSubjectRegistered.fulfilled, (state, action) => {
        state.registered = action.payload.data;
      })
      .addCase(createTeachingRegistration.fulfilled, (state, action) => {
        state.registered.push(action.payload.data);
      })
      .addCase(updateTeachingRegistration.fulfilled, (state, action) => {
        state.registered = state.registered.map((item) =>
          item.id === action.payload.data.id ? action.payload.data : item
        );
      })
      .addCase(deleteTeachingRegistration.fulfilled, (state, action) => {
        state.registered = state.registered.filter(
          (item) => item.id !== action.payload.data.id
        );
      });
  },
});

export const teachingRegistrationReducer = teachingRegistrationSlice.reducer;
