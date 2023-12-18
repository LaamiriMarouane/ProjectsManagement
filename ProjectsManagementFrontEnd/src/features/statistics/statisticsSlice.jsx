import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getStatisticsApi } from "../../api/statistics/statisticsApi";

export const getStatistics = createAsyncThunk(
  "statistics/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getStatisticsApi();

      return res.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message;
      return rejectWithValue(errorMsg);
    }
  }
);

const statisticsSlice = createSlice({
  name: "statistics",
  initialState: {
    statistics: {},
    loading: false,
  },

  extraReducers: (builder) => {
    //****get statistics ****/
    builder
      .addCase(getStatistics.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getStatistics.fulfilled, (state, action) => {
        state.statistics = action.payload;
        state.loading = false;
      })
      .addCase(getStatistics.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default statisticsSlice.reducer;
