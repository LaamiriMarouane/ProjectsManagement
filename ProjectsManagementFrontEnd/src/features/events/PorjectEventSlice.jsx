import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  PostProjectEventApi,
  getProjectEventsApi,
} from "../../api/events/eventApi";
import { setAuthentication } from "../auth/authSlice";

export const PostProjectEvent = createAsyncThunk(
  "projectEvent/Add",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await PostProjectEventApi(
        formData.projectId,
        formData.formData
      );

      return res.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message;
      const status = error?.response?.status;
      return rejectWithValue({ msg: errorMsg, status });
    }
  }
);
export const getProjectEvents = createAsyncThunk(
  "projectEvent/get",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = await getProjectEventsApi(id);
      dispatch(setAuthentication(res.data.jwtAuthenticationResponse));
      return res.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message;
      const status = error?.response?.status;
      return rejectWithValue({ msg: errorMsg, status });
    }
  }
);

const projectEventSlice = createSlice({
  name: "projectEvents",
  initialState: {
    projectEvents: [{}],
    loading: false,
    projectEventsError: "",
  },

  extraReducers: (builder) => {
    //****add event ****/
    builder
      .addCase(PostProjectEvent.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(PostProjectEvent.fulfilled, (state, action) => {
        state.projectEvents = [...state.projectEvents, action.payload];

        state.loading = false;
      })
      .addCase(PostProjectEvent.rejected, (state, action) => {
        state.loading = false;
      });
    //****get events ****/
    builder
      .addCase(getProjectEvents.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getProjectEvents.fulfilled, (state, action) => {
        state.projectEvents = [...action.payload?.events];
        state.loading = false;
      })
      .addCase(getProjectEvents.rejected, (state, action) => {
        state.loading = false;
        state.projectEventsError = action.payload;
      });
  },
});

export default projectEventSlice.reducer;
