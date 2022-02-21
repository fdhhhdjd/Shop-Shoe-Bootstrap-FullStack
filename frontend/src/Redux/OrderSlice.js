import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const GetOrderInitial = createAsyncThunk(
  "order/getAllOrder",
  async ({ tokens }) => {
    const response = await axios.get("/api/payment/payments", {
      headers: { Authorization: tokens },
    });
    return response.data;
  }
);
export const GetDeleteOrderInitial = createAsyncThunk(
  "order/getAllDeleteOrder",
  async ({ tokens }) => {
    const response = await axios.get("/api/payment/deletePayment", {
      headers: { Authorization: tokens },
    });
    return response.data;
  }
);
export const GetIdOrderInitial = createAsyncThunk(
  "order/getIdOrder",
  async ({ id, tokens }) => {
    const response = await axios.get(`/api/payment/payments/${id}`, {
      headers: { Authorization: tokens },
    });
    return response.data;
  }
);
export const GetOrderNewUserInitial = createAsyncThunk(
  "order/getOrderNewUser",
  async ({ tokens }) => {
    const response = await axios.get("/api/payment/newPayment", {
      headers: { Authorization: tokens },
    });
    return response.data;
  }
);
export const DeleteOrderNewUserInitial = createAsyncThunk(
  "order/DeleteOrderNewUser",
  async ({ id }) => {
    const response = await axios.patch(`/api/payment/deletePayments/${id}`);
    return response.data;
  }
);
export const UndoOrderNewUserInitial = createAsyncThunk(
  "order/undoOrderNewUser",
  async ({ id }) => {
    const response = await axios.patch(`/api/payment/undoPayments/${id}`);
    return response.data;
  }
);

const initialState = {
  loadings: false,
  error: null,
  order: [],
  detailOrder: [],
  newUserBuy: [],
  deletePayments: [],
  orders: [],
  undoPayments: [],
};
const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reset: (state) => {
      state.detailOrder = [];
      state.undoPayments = [];
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
    //Get All Delete Order
    [GetDeleteOrderInitial.pending]: (state, action) => {
      state.loadings = true;
    },
    [GetDeleteOrderInitial.fulfilled]: (state, action) => {
      state.loadings = false;
      state.orders = action.payload;
    },
    [GetDeleteOrderInitial.rejected]: (state, action) => {
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
    //Get New User Buy 3 Day
    [GetOrderNewUserInitial.pending]: (state, action) => {
      state.loadings = true;
    },
    [GetOrderNewUserInitial.fulfilled]: (state, action) => {
      state.loadings = false;
      state.newUserBuy = action.payload;
    },
    [GetOrderNewUserInitial.rejected]: (state, action) => {
      state.loadings = false;
      state.error = action.payload;
    },
    //User Delete Payment
    [DeleteOrderNewUserInitial.pending]: (state, action) => {
      state.loadings = true;
    },
    [DeleteOrderNewUserInitial.fulfilled]: (state, action) => {
      state.loadings = false;
      state.deletePayments = action.payload;
    },
    [DeleteOrderNewUserInitial.rejected]: (state, action) => {
      state.loadings = false;
      state.error = action.payload;
    },
    //User Delete Payment
    [UndoOrderNewUserInitial.pending]: (state, action) => {
      state.loadings = true;
    },
    [UndoOrderNewUserInitial.fulfilled]: (state, action) => {
      state.loadings = false;
      state.undoPayments = action.payload;
    },
    [UndoOrderNewUserInitial.rejected]: (state, action) => {
      state.loadings = false;
      state.error = action.payload;
    },
  },
});
const Orders = OrderSlice.reducer;
export const { reset } = OrderSlice.actions;
export default Orders;
