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

const initialState = {
  loadings: false,
  error: null,
  order: [],
};
const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reset: (state) => {},
  },
  extraReducers: {
    //Get All Product
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
  },
});
const Orders = OrderSlice.reducer;
export const { reset } = OrderSlice.actions;
export default Orders;
