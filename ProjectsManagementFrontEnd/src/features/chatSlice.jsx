import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  PostaddContact,
  getAllContacts,
  getContactChatDetails,
} from "../api/chatAPI";

export const postAddContact = createAsyncThunk(
  "addContact/post",
  async (id, { rejectWithValue }) => {
    try {
      const res = await PostaddContact(id);
      return res.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message;
      return rejectWithValue(errorMsg);
    }
  }
);
export const getChatDetails = createAsyncThunk(
  "getDetails/get",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getContactChatDetails(id);
      return res.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message;
      return rejectWithValue(errorMsg);
    }
  }
);
export const getAllChatContacts = createAsyncThunk(
  "allContacts/get",
  async (id, { rejectWithValue }) => {
    try {
      const res = await getAllContacts();
      return res.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message;
      return rejectWithValue(errorMsg);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    contacts: [],
    chatDetails: {},
    chatLoading: true,
    error: "",
  },
  reducers: {
    addChatMessage: (state, { payload }) => {
      const messages = state.chatDetails.messages.filter(
        (msg) => msg.id != payload.id
      );
      state.chatDetails = {
        ...state.chatDetails,
        messages: [...messages, payload],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postAddContact.pending, (state, action) => {
        state.chatLoading = true;
        state.error = "";
      })
      .addCase(postAddContact.fulfilled, (state, { payload }) => {
        state.contacts = [...state.contacts, payload];

        state.chatLoading = false;
      })
      .addCase(postAddContact.rejected, (state, action) => {
        state.chatLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getChatDetails.pending, (state, action) => {
        state.chatLoading = true;
        state.error = "";
      })
      .addCase(getChatDetails.fulfilled, (state, { payload }) => {
        state.chatDetails = payload;

        state.chatLoading = false;
      })
      .addCase(getChatDetails.rejected, (state, action) => {
        state.chatLoading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getAllChatContacts.pending, (state, action) => {
        state.chatLoading = true;
        state.error = "";
      })
      .addCase(getAllChatContacts.fulfilled, (state, { payload }) => {
        state.contacts = [...payload];

        state.chatLoading = false;
      })
      .addCase(getAllChatContacts.rejected, (state, action) => {
        state.chatLoading = false;
        state.error = action.payload;
      });
  },
});

export const { addChatMessage } = chatSlice.actions;
export default chatSlice.reducer;
