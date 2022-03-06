import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const GetInformationInitial = createAsyncThunk(
  "Information/getAllInformation",
  async () => {
    const response = await axios.get("/api/carousel/carousels");
    return response.data;
  }
);
export const CreateInformationInitial = createAsyncThunk(
  "Information/createInformation",
  async ({ token, heading, descriptions, images }) => {
    const response = await axios.post(
      "/api/carousel/carousels",
      { heading, descriptions, image: images },
      {
        headers: { Authorization: token },
      }
    );
    return response.data;
  }
);
export const UpdateInformationInitial = createAsyncThunk(
  "Information/UpdateInformation",
  async ({ token, id, heading, descriptions, images }) => {
    const response = await axios.patch(
      `/api/carousel/carousels/${id}`,
      { heading, descriptions, image: images },
      {
        headers: { Authorization: token },
      }
    );
    return response.data;
  }
);
export const DeleteInformationInitial = createAsyncThunk(
  "Information/DeleteInformation",
  async ({ token, id }) => {
    const response = await axios.delete(`/api/carousel/carousels/${id}`, {
      headers: { Authorization: token },
    });
    return response.data;
  }
);
const initialState = {
  loadings: false,
  error: null,
  Information: [],
  createInformation: [],
  deleteInformation: [],
  updateInformation: [],
};
const InformationAdminSlice = createSlice({
  name: "Info",
  initialState,
  reducers: {
    reset: (state) => {
      state.createInformation = [];
      state.deleteInformation = [];
      state.updateInformation = [];
    },
  },
  extraReducers: {
    //Get All Information
    [GetInformationInitial.pending]: (state, action) => {
      state.loadings = true;
    },
    [GetInformationInitial.fulfilled]: (state, action) => {
      state.loadings = false;
      state.Information = action.payload;
    },
    [GetInformationInitial.rejected]: (state, action) => {
      state.loadings = false;
      state.error = action.payload;
    },
    //create Information
    [CreateInformationInitial.pending]: (state, action) => {
      state.loadings = true;
    },
    [CreateInformationInitial.fulfilled]: (state, action) => {
      state.loadings = false;
      state.createInformation = action.payload;
    },
    [CreateInformationInitial.rejected]: (state, action) => {
      state.loadings = false;
      state.error = action.payload;
    },
    //update Information
    [UpdateInformationInitial.pending]: (state, action) => {
      state.loadings = true;
    },
    [UpdateInformationInitial.fulfilled]: (state, action) => {
      state.loadings = false;
      state.updateInformation = action.payload;
    },
    [UpdateInformationInitial.rejected]: (state, action) => {
      state.loadings = false;
      state.error = action.payload;
    },
    // Delete Information
    [DeleteInformationInitial.pending]: (state, action) => {
      state.loadings = true;
    },
    [DeleteInformationInitial.fulfilled]: (state, action) => {
      state.loadings = false;
      state.deleteInformation = action.payload;
    },
    [DeleteInformationInitial.rejected]: (state, action) => {
      state.loadings = false;
      state.error = action.payload;
    },
    // History order
  },
});
const Information = InformationAdminSlice.reducer;
export const { reset } = InformationAdminSlice.actions;
export default Information;
