import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSearchUsersApi } from "../api/userApi";

export const getSearchUsers = createAsyncThunk(
  "users/get",
  async (subString, { rejectWithValue }) => {
    try {
      const res = await getSearchUsersApi(subString);
      return res.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message;
      return rejectWithValue(errorMsg);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
  },
  reducers: {
    resetUsers: (state, { payload }) => {
      state.users = [];
    },
  },

  extraReducers: (builder) => {
    //**** search users ****/
    builder
      .addCase(getSearchUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSearchUsers.fulfilled, (state, action) => {
        state.users = [...action.payload];
        state.loading = false;
      })
      .addCase(getSearchUsers.rejected, (state, action) => {
        console.log("rejected", action.payload);
        state.loading = false;
      });
  },
});
export const { resetUsers } = userSlice.actions;

export default userSlice.reducer;
