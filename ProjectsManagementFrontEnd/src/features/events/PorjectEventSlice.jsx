import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  PostProjectEventApi,
  getProjectEventsApi,
} from "../../api/events/eventApi";

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
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);
export const getProjectEvents = createAsyncThunk(
  "projectEvent/get",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getProjectEventsApi(id);

      return res.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message;
      return rejectWithValue(errorMsg);
    }
  }
);

const projectEventSlice = createSlice({
  name: "projectEvents",
  initialState: {
    projectEvents: [{}],
    loading: false,
  },

  extraReducers: (builder) => {
    //****add event ****/
    builder
      .addCase(PostProjectEvent.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(PostProjectEvent.fulfilled, (state, action) => {
        state.projectEvents = [...state.userEvents, action.payload];

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
        state.projectEvents = [...action.payload];
        state.loading = false;
      })
      .addCase(getProjectEvents.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.loading = false;
      });
  },
});

export default projectEventSlice.reducer;
