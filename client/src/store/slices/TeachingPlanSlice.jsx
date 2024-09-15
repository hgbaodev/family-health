import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "~/api/AxiosInstance";

export const fetchSchoolYears = createAsyncThunk(
  "teachingPlan/fetchSchoolYears",
  async () => {
    const response = await axiosInstance.get(`/school-years`);
    return response.data;
  }
);

export const fetchSchoolYear = createAsyncThunk(
  "teachingPlan/fetchSchoolYear",
  async (id) => {
    const response = await axiosInstance.get(`/school-years/${id}`);
    return response.data;
  }
);

export const createSchoolYear = createAsyncThunk(
  "teachingPlan/createSchoolYear",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/school-years", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteSchoolYear = createAsyncThunk(
  "teachingPlan/deleteSchoolYear",
  async (id) => {
    const response = await axiosInstance.delete(`/school-years/${id}`);
    return response.data;
  }
);

export const fetchTeachingPlan = createAsyncThunk(
  "teachingPlan/fetchTeachingPlan",
  async (id) => {
    const response = await axiosInstance.get(`/teaching-plans/${id}`);
    return response.data;
  }
);

export const createTeachingPlan = createAsyncThunk(
  "teachingPlan/createTeachingPlan",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/teaching-plans", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTeachingPlan = createAsyncThunk(
  "teachingPlan/deleteTeachingPlan",
  async (id) => {
    const response = await axiosInstance.delete(`/teaching-plans/${id}`);
    return response.data;
  }
);

export const updateTeachingPlan = createAsyncThunk(
  "teachingPlan/updateTeachingPlan",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/teaching-plans/${data.id}`,
        data
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateSubjectTeachingPlan = createAsyncThunk(
  "teachingPlan/updateSubjectTeachingPlan",
  async ({ id, subjects }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/teaching-plans/${id}/subjects`,
        subjects
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const exportTeachingPlan = createAsyncThunk(
  "teachingPlan/exportTeachingPlan",
  async (id) => {
    const response = await axiosInstance.get(`/teaching-plans/${id}/export`, {
      responseType: "blob",
    });
    return response.data;
  }
);

export const createProgramAssignment = createAsyncThunk(
  "teachingPlan/createProgramAssignment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/program-assignments", data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProgramAssignment = createAsyncThunk(
  "teachingPlan/deleteProgramAssignment",
  async (id) => {
    const response = await axiosInstance.delete(`/program-assignments/${id}`);
    return response.data;
  }
);

const teachingPlanSlice = createSlice({
  name: "teachingPlan",
  initialState: {
    items: [],
    loadingFetch: false,
    loadingForm: false,
    loadingFetchDetails: false,
    error: null,
    semesters: [],
    selectedSchoolYear: null,
  },
  reducers: {
    setSelectedSchoolYear(state, action) {
      state.selectedSchoolYear = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSchoolYears.pending, (state) => {
        state.loadingFetch = true;
        state.error = null;
      })
      .addCase(fetchSchoolYears.fulfilled, (state, action) => {
        state.loadingFetch = false;
        state.items = action.payload.data;
      })
      .addCase(fetchSchoolYears.rejected, (state, action) => {
        state.loadingFetch = false;
        state.error = action.error.message;
      })
      .addCase(createSchoolYear.pending, (state) => {
        state.loadingForm = true;
      })
      .addCase(createSchoolYear.fulfilled, (state, action) => {
        state.loadingForm = false;
        state.items.unshift(action.payload.data);
      })
      .addCase(createSchoolYear.rejected, (state) => {
        state.loadingForm = false;
      })
      .addCase(deleteSchoolYear.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.data.id
        );
      })
      .addCase(fetchSchoolYear.pending, (state) => {
        state.loadingFetchDetails = true;
      })
      .addCase(fetchSchoolYear.fulfilled, (state, action) => {
        state.programAssignments = action.payload.data.program_assignment;
        state.loadingFetchDetails = false;
      })
      .addCase(fetchSchoolYear.rejected, (state) => {
        state.loadingFetchDetails = false;
      })
      .addCase(createProgramAssignment.fulfilled, (state, action) => {
        state.programAssignments.push(action.payload.data);
      })
      .addCase(deleteProgramAssignment.fulfilled, (state, action) => {
        state.programAssignments = state.programAssignments.filter(
          (item) => item.id !== action.payload.data.id
        );
      })
      .addCase(createTeachingPlan.fulfilled, (state, action) => {
        const programAssignment = state.programAssignments.find(
          (item) => item.id === action.payload.data.program_assignment_id
        );
        programAssignment.teaching_plans.push(action.payload.data);
      })
      .addCase(deleteTeachingPlan.fulfilled, (state, action) => {
        const programAssignment = state.programAssignments.find(
          (item) => item.id === action.payload.data.program_assignment_id
        );
        programAssignment.teaching_plans =
          programAssignment.teaching_plans.filter(
            (item) => item.id !== action.payload.data.id
          );
      });
  },
});

export const teachingPlanReducer = teachingPlanSlice.reducer;
export const { setSelectedSchoolYear } = teachingPlanSlice.actions;
