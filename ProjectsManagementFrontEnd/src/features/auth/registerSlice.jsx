import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const registerUser = createAsyncThunk("register", async (formData) => {
  const res = await axios.post(
    "http://localhost:8080/api/v1/register",
    formData
  );
  return res.data;
});

const registerSlice = createSlice({
  name: "userInfo",
  initialState: {
    userInfo: {},
    loading: false,
  },
  reducers: {
    setRegisteration: (state, { payload }) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.userInfo = payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log("rejected", action.error?.message);
        state.loading = false;
      });
  },
});
export const { setRegisteration } = registerSlice.actions;

export default registerSlice.reducer;
