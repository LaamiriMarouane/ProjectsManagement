import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import {
  getAcceptedDemandsApi,
  getNewDemandsApi,
  getRejectedDemandsApi,
  getdemandsApi,
  postCreateDemandApi,
  putUpdateDemandApi,
  putRejectDemanddApi,
  putValidateDemandApi,
  getUserAcceptedDemandsApi,
  getUserNewDemandsApi,
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
export const putUpdateDemand = createAsyncThunk(
  "Demand/Update",
  async (formData, { _, rejectWithValue }) => {
    try {
      const res = await putUpdateDemandApi(formData);
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
export const getUserNewDemands = createAsyncThunk(
  "UserDemands/getNew",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUserNewDemandsApi();
      return res.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message;
      return rejectWithValue(errorMsg);
    }
  }
);
export const getUserAcceptedDemands = createAsyncThunk(
  "UserDemands/getAccepted",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getUserAcceptedDemandsApi();
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
export const getAcceptedDemands = createAsyncThunk(
  "Demands/getAccepted",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAcceptedDemandsApi();
      return res.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message;
      return rejectWithValue(errorMsg);
    }
  }
);
export const putValidateDemand = createAsyncThunk(
  "Demand/accepte",
  async (id, { rejectWithValue }) => {
    try {
      const res = await putValidateDemandApi(id);
      return res.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message;
      return rejectWithValue(errorMsg);
    }
  }
);
export const putRejectDemand = createAsyncThunk(
  "Demand/reject",
  async (id, { rejectWithValue }) => {
    try {
      const res = await putRejectDemanddApi(id);
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
    rejectedDemands: [],
    acceptedDemands: [],
    newDemands: [],
    Demands: [],
    DemandErrors: "",
    DemandsLoading: true,
    newDemandsLoading: true,
    acceptedDemandsLoading: true,
    rejectedDemandsLoading: true,
  },

  extraReducers: (builder) => {
    builder
      .addCase(PostCreateDemand.pending, (state, action) => {
        state.newDemandsLoading = true;
      })
      .addCase(PostCreateDemand.fulfilled, (state, action) => {
        state.newDemands = [action.payload, ...state.newDemands];
        state.newDemandsLoading = false;
      })
      .addCase(PostCreateDemand.rejected, (state, action) => {
        state.newDemandsLoading = false;
        state.DemandErrors = action.payload;
      });
    builder
      .addCase(putUpdateDemand.pending, (state, action) => {
        state.newDemandsLoading = true;
      })
      .addCase(putUpdateDemand.fulfilled, (state, { payload }) => {
        state.newDemands = state.newDemands.map((demand) => {
          if (demand.id == payload.id) {
            return payload;
          }
          return demand;
        });
        state.newDemandsLoading = false;
      })
      .addCase(putUpdateDemand.rejected, (state, action) => {
        state.newDemandsLoading = false;
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
        state.newDemandsLoading = true;
      })
      .addCase(getNewDemands.fulfilled, (state, action) => {
        state.newDemands = [...action.payload];

        state.newDemandsLoading = false;
      })
      .addCase(getNewDemands.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.newDemandsLoading = false;
      });
    builder
      .addCase(getUserNewDemands.pending, (state, action) => {
        state.newDemandsLoading = true;
      })
      .addCase(getUserNewDemands.fulfilled, (state, action) => {
        state.newDemands = [...action.payload];

        state.newDemandsLoading = false;
      })
      .addCase(getUserNewDemands.rejected, (state, action) => {
        state.newDemandsLoading = false;
      });
    builder
      .addCase(getRejectedDemands.pending, (state, action) => {
        state.rejectedDemandsLoading = true;
      })
      .addCase(getRejectedDemands.fulfilled, (state, action) => {
        state.rejectedDemands = [...action.payload];

        state.rejectedDemandsLoading = false;
      })
      .addCase(getRejectedDemands.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.rejectedDemandsLoading = false;
      });

    builder
      .addCase(getAcceptedDemands.pending, (state, action) => {
        state.acceptedDemandsLoading = true;
      })
      .addCase(getAcceptedDemands.fulfilled, (state, action) => {
        state.acceptedDemands = [...action.payload];

        state.acceptedDemandsLoading = false;
      })
      .addCase(getAcceptedDemands.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.acceptedDemandsLoading = false;
      });
    builder
      .addCase(getUserAcceptedDemands.pending, (state, action) => {
        state.acceptedDemandsLoading = true;
      })
      .addCase(getUserAcceptedDemands.fulfilled, (state, action) => {
        state.acceptedDemands = [...action.payload];

        state.acceptedDemandsLoading = false;
      })
      .addCase(getUserAcceptedDemands.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.acceptedDemandsLoading = false;
      });
    builder
      .addCase(putValidateDemand.pending, (state, action) => {
        state.newDemandsLoading = true;
      })
      .addCase(putValidateDemand.fulfilled, (state, { payload }) => {
        state.newDemands = state.newDemands.filter(
          (demand) => demand.id !== payload.id
        );

        state.newDemandsLoading = false;
      })
      .addCase(putValidateDemand.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.newDemandsLoading = false;
      });
    builder
      .addCase(putRejectDemand.pending, (state, action) => {
        state.newDemandsLoading = true;
      })
      .addCase(putRejectDemand.fulfilled, (state, { payload }) => {
        state.newDemands = state.newDemands.filter(
          (demand) => demand.id !== payload.id
        );

        state.newDemandsLoading = false;
      })
      .addCase(putRejectDemand.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.newDemandsLoading = false;
      });
  },
});

export const { getDemandToUpdate } = demandSlice.actions;

export default demandSlice.reducer;
