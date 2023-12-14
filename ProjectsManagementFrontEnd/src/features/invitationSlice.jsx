import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postSendInvitationApi } from "../api/invitationApi";

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
      return rejectWithValue(errorMsg);
    }
  }
);

const invitationSlice = createSlice({
  name: "invitation",
  initialState: {
    sentInvitations: [],
    receivedInvitation: [],
    invitationloading: false,
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
  },
});

export default invitationSlice.reducer;
