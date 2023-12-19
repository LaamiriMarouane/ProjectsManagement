import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllInvitationsByProjectApi,
  getReceivedInvitationApi,
  postSendInvitationApi,
  putAcceptInvitationApi,
  putDeclineInvitationApi,
} from "../api/invitationApi";
import { setAuthentication } from "./auth/authSlice";

export const postSendInvitation = createAsyncThunk(
  "sendInvitation/post",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await postSendInvitationApi(
        formData.projectId,
        formData.toUserId
      );
      return res.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message;
      const status = error?.response?.status;
      return rejectWithValue({ msg: errorMsg, status });
    }
  }
);
export const getSentInvitations = createAsyncThunk(
  "sentInvitations/get",
  async (projectId, { rejectWithValue, dispatch }) => {
    try {
      const res = await getAllInvitationsByProjectApi(projectId);
      dispatch(setAuthentication(res.data.jwtAuthenticationResponse));
      return res.data?.invitations;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message;
      const status = error?.response?.status;
      return rejectWithValue({ msg: errorMsg, status });
    }
  }
);

export const getReceivedInvitations = createAsyncThunk(
  "receivedInvitations/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getReceivedInvitationApi();
      return res.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message;
      const status = error?.response?.status;
      return rejectWithValue({ msg: errorMsg, status });
    }
  }
);
export const putDeclineInvitation = createAsyncThunk(
  "declineInvitation/put",
  async (id, { rejectWithValue }) => {
    try {
      const res = await putDeclineInvitationApi(id);
      return res.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message;
      const status = error?.response?.status;
      return rejectWithValue({ msg: errorMsg, status });
    }
  }
);
export const putAcceptInvitation = createAsyncThunk(
  "acceptInvitation/put",
  async (id, { rejectWithValue }) => {
    try {
      const res = await putAcceptInvitationApi(id);
      return res.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message;
      const status = error?.response?.status;
      return rejectWithValue({ msg: errorMsg, status });
    }
  }
);

const invitationSlice = createSlice({
  name: "invitation",
  initialState: {
    sentInvitations: [],
    receivedInvitation: [],
    invitationloading: true,
    error: "",
  },

  extraReducers: (builder) => {
    //****  send invitation ****/
    builder
      .addCase(postSendInvitation.pending, (state, action) => {
        state.invitationloading = true;
      })
      .addCase(postSendInvitation.fulfilled, (state, action) => {
        state.invitationloading = false;
      })
      .addCase(postSendInvitation.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.invitationloading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getReceivedInvitations.pending, (state, action) => {
        state.invitationloading = true;
      })
      .addCase(getReceivedInvitations.fulfilled, (state, { payload }) => {
        state.receivedInvitation = [...payload];
        state.invitationloading = false;
      })
      .addCase(getReceivedInvitations.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.invitationloading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getSentInvitations.pending, (state, action) => {
        state.invitationloading = true;
      })
      .addCase(getSentInvitations.fulfilled, (state, { payload }) => {
        state.sentInvitations = [...payload];
        state.invitationloading = false;
      })
      .addCase(getSentInvitations.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.invitationloading = false;
        console.log(action.payload);
        state.error = action.payload;
      });
    builder
      .addCase(putAcceptInvitation.pending, (state, action) => {
        state.invitationloading = true;
      })
      .addCase(putAcceptInvitation.fulfilled, (state, { payload }) => {
        state.receivedInvitation = state.receivedInvitation.filter(
          (invitation) => invitation?.id !== payload.id
        );
        state.invitationloading = false;
      })
      .addCase(putAcceptInvitation.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.invitationloading = false;
        state.error = action.payload;
      });
    builder
      .addCase(putDeclineInvitation.pending, (state, action) => {
        state.invitationloading = true;
      })
      .addCase(putDeclineInvitation.fulfilled, (state, { payload }) => {
        state.receivedInvitation = state.receivedInvitation.filter(
          (invitation) => invitation?.id !== payload.id
        );
        state.invitationloading = false;
      })
      .addCase(putDeclineInvitation.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.invitationloading = false;
        state.error = action.payload;
      });
  },
});

export default invitationSlice.reducer;
