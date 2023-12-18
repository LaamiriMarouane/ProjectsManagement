import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsersListApi } from "../api/userApi";

export const getUsers = createAsyncThunk(
  "users/get",
  async ({ page, pageSize, searchTerm }, { rejectWithValue }) => {
    try {
      const res = await getUsersListApi(page, pageSize, searchTerm);
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
    users: {
      users: [],
      totalRows: 0,
    },

    loading: true,
  },
  reducers: {
    resetUsers: (state, { payload }) => {
      state.users = { users: [], totalRows: 0 };
    },
  },

  extraReducers: (builder) => {
    //**** search users ****/

    builder
      .addCase(getUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;

        state.loading = false;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export const { resetUsers } = userSlice.actions;

export default userSlice.reducer;
