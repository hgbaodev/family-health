import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axiosInstance from "~/api/AxiosInstance";

export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
});

export const fetchUser = createAsyncThunk("auth/fetchUser", async () => {
  const response = await axiosInstance.post("/auth/me");
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isInitialized: false,
    error: null,
  },
  reducers: {
    setInitialized: (state, action) => {
      state.isInitialized = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { id, code, fullname, email, access_token } = action.payload.data;
        state.user = { id, code, fullname, email };
        Cookies.set("access_token", access_token, { expires: 14 });
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload.message;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isInitialized = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        const { id, code, fullname, email } = action.payload.data;
        state.user = { id, code, fullname, email };
        state.isInitialized = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isInitialized = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        Cookies.remove("access_token");
      });
  },
});

export const authReducer = authSlice.reducer;
export const { setInitialized } = authSlice.actions;
