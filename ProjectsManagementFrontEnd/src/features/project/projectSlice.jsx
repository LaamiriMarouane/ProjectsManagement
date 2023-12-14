import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllpublicProjectsApi,
  getMyProjectsApi,
  getProjectDetailsApi,
} from "../../api/project/projectApi";

export const getAllPublicProjects = createAsyncThunk(
  "AllProjects/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllpublicProjectsApi();
      return res.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message;
      return rejectWithValue(errorMsg);
    }
  }
);
export const getMyProjects = createAsyncThunk(
  "MyProjects/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getMyProjectsApi();
      return res.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message;
      return rejectWithValue(errorMsg);
    }
  }
);
export const getProjectDetails = createAsyncThunk(
  "ProjectDetails/get",
  async (projectId, { rejectWithValue }) => {
    try {
      const res = await getProjectDetailsApi(projectId);
      return res.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message;
      return rejectWithValue(errorMsg);
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    project: {},
    projectsloading: false,
    error: "",
  },

  extraReducers: (builder) => {
    //********/
    builder
      .addCase(getAllPublicProjects.pending, (state, action) => {
        state.projectsloading = true;
      })
      .addCase(getAllPublicProjects.fulfilled, (state, { payload }) => {
        state.projects = [...payload];
        state.projectsloading = false;
      })
      .addCase(getAllPublicProjects.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.projectsloading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getMyProjects.pending, (state, action) => {
        state.projectsloading = true;
      })
      .addCase(getMyProjects.fulfilled, (state, { payload }) => {
        state.projects = [...payload];
        state.projectsloading = false;
      })
      .addCase(getMyProjects.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.projectsloading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getProjectDetails.pending, (state, action) => {
        state.projectsloading = true;
      })
      .addCase(getProjectDetails.fulfilled, (state, { payload }) => {
        state.project = payload;
        state.projectsloading = false;
      })
      .addCase(getProjectDetails.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.projectsloading = false;
        state.error = action.payload;
      });
  },
});

export default projectSlice.reducer;
