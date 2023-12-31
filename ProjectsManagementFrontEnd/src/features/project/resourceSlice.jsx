import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllResourcesByProjectApi,
  getFileContentApi,
  createFileApi,
  createFolderApi,
} from "../../api/project/resourceApi";

export const getAllResources = createAsyncThunk(
  "AllResources/get",
  async (projectId, { rejectWithValue }) => {
    try {
      const res = await getAllResourcesByProjectApi(projectId);
      return res.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message;
      const status = error?.response?.status;
      return rejectWithValue({ msg: errorMsg, status });
    }
  }
);

export const getFileContent = createAsyncThunk(
  "FileContent/get",
  async (fileId, { rejectWithValue }) => {
    try {
      const res = await getFileContentApi(fileId);
      return res.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message;
      const status = error?.response?.status;
      return rejectWithValue({ msg: errorMsg, status });
    }
  }
);

export const createFile = createAsyncThunk(
  "CreateFile/post",
  async ({ file, parentId, projectId }, { rejectWithValue, dispatch }) => {
    try {
      const res = await createFileApi(file, parentId);
      dispatch(getAllResources(projectId));
      return res.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message;
      const status = error?.response?.status;
      return rejectWithValue({ msg: errorMsg, status });
    }
  }
);

export const createFolder = createAsyncThunk(
  "CreateFolder/post",
  async ({ folder, projectId }, { rejectWithValue, dispatch }) => {
    try {
      const res = await createFolderApi(folder);
      dispatch(getAllResources(projectId));
      return res.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message;
      const status = error?.response?.status;
      return rejectWithValue({ msg: errorMsg, status });
    }
  }
);

const resourceSlice = createSlice({
  name: "resources",
  initialState: {
    resources: [],
    fileContent: "",
    loading: true,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAllResources.pending, (state) => {
        state.error = "";
        state.loading = true;
      })
      .addCase(getAllResources.fulfilled, (state, { payload }) => {
        state.resources = [...payload];
        state.loading = false;
      })
      .addCase(getAllResources.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg;
      });

    builder
      .addCase(getFileContent.pending, (state) => {
        state.error = "";
        state.loading = true;
      })
      .addCase(getFileContent.fulfilled, (state, { payload }) => {
        state.fileContent = payload;
        state.loading = false;
      })
      .addCase(getFileContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg;
      });

    builder
      .addCase(createFile.pending, (state) => {
        state.error = "";
        state.loading = true;
      })
      .addCase(createFile.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.fileContent = payload || {};
      })
      .addCase(createFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg;
      });

    builder
      .addCase(createFolder.pending, (state) => {
        state.error = "";
        state.loading = true;
      })
      .addCase(createFolder.fulfilled, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(createFolder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg;
      });
  },
});

export default resourceSlice.reducer;
