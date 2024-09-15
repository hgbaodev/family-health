import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "~/api/AxiosInstance";

export const fetchTeachingPlanAssignments = createAsyncThunk(
  "teachingPlan/fetchTeachingPlanAssignments",
  async (id) => {
    const response = await axiosInstance.get(
      `/teaching-plans/${id}/assignments`
    );
    return response.data;
  }
);

export const createTeachingAssignment = createAsyncThunk(
  "teachingAssignments/createTeachingAssignment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/teaching-assignments", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTeachingAssignment = createAsyncThunk(
  "teachingAssignments/updateTeachingAssignment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/teaching-assignments/${data.id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTeachingAssignment = createAsyncThunk(
  "teachingAssignments/deleteTeachingAssignment",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/teaching-assignments/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const teachingAssignmentSlice = createSlice({
  name: "teachingAssignment",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachingPlanAssignments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(createTeachingAssignment.fulfilled, (state, action) => {
        const subject_teaching_plan_id = action.payload.data[0].subject_teaching_plan_id;
        const index = state.data.subject_teaching_plans.findIndex(
          (item) => item.id === subject_teaching_plan_id
        );
        state.data.subject_teaching_plans[index].assignments = [
          ...state.data.subject_teaching_plans[index].assignments,
          ...action.payload.data,
        ];
      })
      .addCase(deleteTeachingAssignment.fulfilled, (state, action) => {
        const { subject_teaching_plan_id, id } = action.payload.data;
        const index = state.data.subject_teaching_plans.findIndex(
          (item) => item.id === subject_teaching_plan_id
        );
        state.data.subject_teaching_plans[index].assignments =
          state.data.subject_teaching_plans[index].assignments.filter(
            (item) => item.id !== id
          );
      });
  },
});

export const teachingAssignmentReducer = teachingAssignmentSlice.reducer;
