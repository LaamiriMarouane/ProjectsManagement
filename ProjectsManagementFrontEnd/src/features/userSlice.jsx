import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSearchUsersApi, getUsersListApi } from "../api/userApi";

export const getSearchUsers = createAsyncThunk(
  "searchUsers/get",
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
export const getUsers = createAsyncThunk(
  "users/get",
  async ({ page, pageSize }, { rejectWithValue }) => {
    try {
      const res = await getUsersListApi(page, pageSize);
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
