import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllpublicProjectsApi,
  getMyProjectsApi,
  getProjectDetailsApi,
} from "../../api/project/projectApi";
import { setAuthentication } from "../auth/authSlice";

export const getAllPublicProjects = createAsyncThunk(
  "AllProjects/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllpublicProjectsApi();
      return res.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message;
      const status = error?.response?.status;
      return rejectWithValue({ msg: errorMsg, status });
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
      const status = error?.response?.status;
      return rejectWithValue({ msg: errorMsg, status });
    }
  }
);
export const getProjectDetails = createAsyncThunk(
  "ProjectDetails/get",
  async (projectId, { rejectWithValue, dispatch }) => {
    try {
      const res = await getProjectDetailsApi(projectId);
      console.log(res.data);
      dispatch(setAuthentication(res.data.jwtAuthenticationResponse));
      return res.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message;
      const status = error?.response?.status;
      return rejectWithValue({ msg: errorMsg, status });
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    project: {},
    projectsloading: true,
    projectsError: "",
  },

  extraReducers: (builder) => {
    //********/
    builder
      .addCase(getAllPublicProjects.pending, (state, action) => {
        state.projectsError = "";
        state.projectsloading = true;
      })
      .addCase(getAllPublicProjects.fulfilled, (state, { payload }) => {
        state.projects = [...payload];
        state.projectsloading = false;
      })
      .addCase(getAllPublicProjects.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.projectsloading = false;
        state.projectsError = action.payload;
      });
    builder
      .addCase(getMyProjects.pending, (state, action) => {
        state.projectsError = "";
        state.projectsloading = true;
      })
      .addCase(getMyProjects.fulfilled, (state, { payload }) => {
        state.projects = [...payload];
        state.projectsloading = false;
      })
      .addCase(getMyProjects.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.projectsloading = false;
        state.projectsError = action.payload;
      });
    builder
      .addCase(getProjectDetails.pending, (state, action) => {
        state.projectsError = "";
        state.projectsloading = true;
      })
      .addCase(getProjectDetails.fulfilled, (state, action) => {
        console.log(action.payload);
        state.project = action.payload;
        state.projectsloading = false;
      })
      .addCase(getProjectDetails.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.projectsloading = false;
        state.projectsError = action.payload;
      });
  },
});

export default projectSlice.reducer;
