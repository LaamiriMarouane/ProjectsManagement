import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getNewDemandsApi,
  getRejectedDemandsApi,
  getdemandsApi,
  postCreateDemandApi,
} from "../api/demandApi";

export const PostCreateDemand = createAsyncThunk(
  "Demand/Add",
  async (formData, { _, rejectWithValue }) => {
    try {
      const res = await postCreateDemandApi(formData);
      return res.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message;
      return rejectWithValue(errorMsg);
    }
  }
);
export const getDemands = createAsyncThunk(
  "Demands/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getdemandsApi();
      return res.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message;
      return rejectWithValue(errorMsg);
    }
  }
);
export const getNewDemands = createAsyncThunk(
  "Demands/getNew",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getNewDemandsApi();
      return res.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message;
      return rejectWithValue(errorMsg);
    }
  }
);
export const getRejectedDemands = createAsyncThunk(
  "Demands/getRejected",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getRejectedDemandsApi();
      return res.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message;
      return rejectWithValue(errorMsg);
    }
  }
);

const demandSlice = createSlice({
  name: "demand",
  initialState: {
    Demands: [],
    DemandErrors: "",
    DemandsLoading: true,
    DemandLoading: true,
  },

  extraReducers: (builder) => {
    builder
      .addCase(PostCreateDemand.pending, (state, action) => {
        state.DemandLoading = true;
      })
      .addCase(PostCreateDemand.fulfilled, (state, action) => {
        state.Demands = [action.payload, ...state.Demands];
        state.DemandLoading = false;
      })
      .addCase(PostCreateDemand.rejected, (state, action) => {
        state.DemandLoading = false;
        state.DemandErrors = action.payload;
      });
    builder
      .addCase(getDemands.pending, (state, action) => {
        state.DemandsLoading = true;
      })
      .addCase(getDemands.fulfilled, (state, action) => {
        state.Demands = [...action.payload];
        state.DemandsLoading = false;
      })
      .addCase(getDemands.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.DemandsLoading = false;
      });
    builder
      .addCase(getNewDemands.pending, (state, action) => {
        state.DemandsLoading = true;
      })
      .addCase(getNewDemands.fulfilled, (state, action) => {
        state.Demands = [...action.payload];
        state.DemandsLoading = false;
      })
      .addCase(getNewDemands.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.DemandsLoading = false;
      });
    builder
      .addCase(getRejectedDemands.pending, (state, action) => {
        state.DemandsLoading = true;
      })
      .addCase(getRejectedDemands.fulfilled, (state, action) => {
        state.Demands = [...action.payload];
        state.DemandsLoading = false;
      })
      .addCase(getRejectedDemands.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.DemandsLoading = false;
      });
  },
});

//export const { updateGuardain, resetGuardian } = demandSlice.actions;

export default demandSlice.reducer;
