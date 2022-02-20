import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const GetOrderInitial = createAsyncThunk(
  "order/getAllOrder",
  async ({ tokens }) => {
    const response = await axios.get("/api/payment", {
      headers: { Authorization: tokens },
    });
    return response.data;
  }
);
export const GetIdOrderInitial = createAsyncThunk(
  "order/getIdOrder",
  async ({ id, tokens }) => {
    const response = await axios.get(`/api/payment/${id}`, {
      headers: { Authorization: tokens },
    });
    return response.data;
  }
);

const initialState = {
  loadings: false,
  error: null,
  order: [],
  detailOrder: [],
};
const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reset: (state) => {
      state.detailOrder = [];
    },
  },
  extraReducers: {
    //Get All Order
    [GetOrderInitial.pending]: (state, action) => {
      state.loadings = true;
    },
    [GetOrderInitial.fulfilled]: (state, action) => {
      state.loadings = false;
      state.order = action.payload;
    },
    [GetOrderInitial.rejected]: (state, action) => {
      state.loadings = false;
      state.error = action.payload;
    },
    //Get Id of Order
    [GetIdOrderInitial.pending]: (state, action) => {
      state.loadings = true;
    },
    [GetIdOrderInitial.fulfilled]: (state, action) => {
      state.loadings = false;
      state.detailOrder = action.payload;
    },
    [GetIdOrderInitial.rejected]: (state, action) => {
      state.loadings = false;
      state.error = action.payload;
    },
  },
});
const Orders = OrderSlice.reducer;
export const { reset } = OrderSlice.actions;
export default Orders;
