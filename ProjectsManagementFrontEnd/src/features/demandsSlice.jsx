import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import {
  getNewDemandsApi,
  getRejectedDemandsApi,
  getdemandsApi,
  postCreateDemandApi,
} from "../api/demandApi";

const userDemandList = [
  {
    id: 1,
    projectName: "Dev Web",
    projectLongName: "Dev Web for testing",
    user: "user-name",
    status: false,
    type: "IT",
    theme: "Développement",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum velit repellat magni aliquam molestias",
    public: false,
    demandeCreatingtime: "12/09/2023, 05:22:20 PM",
  },

  {
    id: 2,
    projectName: "Dev Web",
    projectLongName: "Dev Web for testing",
    user: "user-name",
    status: false,
    type: "IT",
    theme: "Développement",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum velit repellat magni aliquam molestias",
    public: true,
    demandeCreatingtime: "12/09/2023, 05:22:20 PM",
  },
  {
    id: 3,
    projectName: "Dev Web",
    projectLongName: "Dev Web for testing",
    user: "user-name",
    status: false,
    type: "IT",
    theme: "Développement",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum velit repellat magni aliquam molestias",
    public: true,
    demandeCreatingtime: "12/09/2023, 05:22:20 PM",
  },
  {
    id: 4,
    projectName: "Dev Web",
    projectLongName: "Dev Web for testing",
    user: "user-name",
    status: false,
    type: "IT",
    theme: "Développement",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum velit repellat magni aliquam molestias",
    public: true,
    demandeCreatingtime: "12/09/2023, 05:22:20 PM",
  },
];

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
    Demands: [...userDemandList],
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

export const { getDemandToUpdate } = demandSlice.actions;

export default demandSlice.reducer;
