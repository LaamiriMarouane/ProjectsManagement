import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getNewDemandsApi,
  getRejectedDemandsApi,
  getdemandsApi,
  postCreateDemandApi,
} from "../api/demandApi";

function formatDate(date) {
  const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date)
};

const userDemandList = [
  {
      id: 1,
      projectName: "Dev Web",
      user: "user-name",
      status: false,
      type: "IT",
      theme: "Développement",
      description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum velit repellat magni aliquam molestias",
      public: true,
      demandeCreatingtime: formatDate(new Date()),
  },
  {
      id: 2,
      projectName: "Dev Web",
      user: "user-name",
      status: false,
      type: "IT",
      theme: "Développement",
      description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum velit repellat magni aliquam molestias",
      public: true,
      demandeCreatingtime: formatDate(new Date()),
  },
  {
      id: 3,
      projectName: "Dev Web",
      user: "user-name",
      status: false,
      type: "IT",
      theme: "Développement",
      description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum velit repellat magni aliquam molestias",
      public: true,
      demandeCreatingtime: formatDate(new Date()),
  },
  {
      id: 4,
      projectName: "Dev Web",
      user: "user-name",
      status: false,
      type: "IT",
      theme: "Développement",
      description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum velit repellat magni aliquam molestias",
      public: true,
      demandeCreatingtime: formatDate(new Date()),
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

  reducers : {
    getDemandToUpdate : ( state , { payload } ) => {
      console.log( 'Demand : ', state.Demands );
      console.log( 'State : ', state );
      // return state.Demands.filter( (demand) => { 
      //   console.log( 'demand : ', demand );
      //   return demand.id === payload
      // } );
    },
    
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
      }) ;
  },
});

export const { getDemandToUpdate } = demandSlice.actions;

export default demandSlice.reducer;
