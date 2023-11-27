import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const authentication = createAsyncThunk(
  "authentication",
  async (formData) => {
    const res = await axios.post("http://localhost:8080/api/v1/auth", formData);
    return res.data;
  }
);
export const register = createAsyncThunk("register", async (formData) => {
  const res = await axios.post(
    "http://localhost:8080/api/v1/register",
    formData
  );
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    auth: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {},
    loading: false,
  },
  reducers: {
    setAuthentication: (state, { payload }) => {
      if (payload != null) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...payload,
          })
        );
        state.auth = payload;
      }
    },
    DeleteAuthentication: (state, { payload }) => {
      localStorage.removeItem("user");
      state.auth = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authentication.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(authentication.fulfilled, (state, { payload }) => {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...payload,
          })
        );
        state.auth = payload;
        state.loading = false;
      })
      .addCase(authentication.rejected, (state, action) => {
        console.log("rejected", action.error?.message);
        state.loading = false;
      });
  },
});
export const { setAuthentication, DeleteAuthentication } = authSlice.actions;

export default authSlice.reducer;
