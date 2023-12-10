import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { PostUserEventApi, getUserEventsApi } from "../../api/events/eventApi";

export const PostUserEvent = createAsyncThunk(
  "userEvent/Add",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await PostUserEventApi(formData);

      return res.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);
export const getUserEvents = createAsyncThunk(
  "userEvent/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUserEventsApi();

      return res.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message;
      return rejectWithValue(errorMsg);
    }
  }
);

const userEventSlice = createSlice({
  name: "userEvents",
  initialState: {
    userEvents: [{}],
    loading: false,
  },

  extraReducers: (builder) => {
    //****add event ****/
    builder
      .addCase(PostUserEvent.pending, (state, action) => {
        state.loading = true;
        console.log("pending");
      })
      .addCase(PostUserEvent.fulfilled, (state, action) => {
        console.log("fulfilled", action.payload);
        state.userEvents = [...state.userEvents, action.payload];

        state.loading = false;
      })
      .addCase(PostUserEvent.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.loading = false;
      });
    //****get events ****/
    builder
      .addCase(getUserEvents.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUserEvents.fulfilled, (state, action) => {
        state.userEvents = [...action.payload];
        state.loading = false;
      })
      .addCase(getUserEvents.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.loading = false;
      });
  },
});

export default userEventSlice.reducer;
