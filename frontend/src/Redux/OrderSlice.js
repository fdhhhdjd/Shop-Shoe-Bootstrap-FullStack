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
export const GetOrderTotalInitial = createAsyncThunk(
  "order/getTotalOrder",
  async ({ tokens }) => {
    const response = await axios.get("/api/payment/sumOfIncome", {
      headers: { Authorization: tokens },
    });
    return response.data;
  }
);
export const UpdatePaymentStatusInitial = createAsyncThunk(
  "order/updatePaymentStatusOrder",
  async ({ token, id, order_status }) => {
    const response = await axios.patch(
      `/api/payment/update/order_status/${id}`,
      {
        order_status,
      },
      {
        headers: { Authorization: token },
      }
    );
    return response.data;
  }
);
const initialState = {
  loading: false,
  error: null,
  order: [],
  detailOrder: [],
  newUserBuy: [],
  deletePayments: [],
  orders: [],
  undoPayments: [],
  totalPayment: [],
  editStatusPayment: [],
};
const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reset: (state) => {
      state.detailOrder = [];
      state.undoPayments = [];
      state.editStatusPayment = [];
    },
  },
  extraReducers: {
    //Get All Order
    [GetOrderInitial.pending]: (state, action) => {
      state.loading = true;
    },
    [GetOrderInitial.fulfilled]: (state, action) => {
      state.loading = false;
      state.order = action.payload;
    },
    [GetOrderInitial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //Get All Delete Order
    [GetDeleteOrderInitial.pending]: (state, action) => {
      state.loading = true;
    },
    [GetDeleteOrderInitial.fulfilled]: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    [GetDeleteOrderInitial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //Get Id of Order
    [GetIdOrderInitial.pending]: (state, action) => {
      state.loading = true;
    },
    [GetIdOrderInitial.fulfilled]: (state, action) => {
      state.loading = false;
      state.detailOrder = action.payload;
    },
    [GetIdOrderInitial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //Get New User Buy 3 Day
    [GetOrderNewUserInitial.pending]: (state, action) => {
      state.loading = true;
    },
    [GetOrderNewUserInitial.fulfilled]: (state, action) => {
      state.loading = false;
      state.newUserBuy = action.payload;
    },
    [GetOrderNewUserInitial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //User Delete Payment
    [DeleteOrderNewUserInitial.pending]: (state, action) => {
      state.loading = true;
    },
    [DeleteOrderNewUserInitial.fulfilled]: (state, action) => {
      state.loading = false;
      state.deletePayments = action.payload;
    },
    [DeleteOrderNewUserInitial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //User Delete Payment
    [UndoOrderNewUserInitial.pending]: (state, action) => {
      state.loading = true;
    },
    [UndoOrderNewUserInitial.fulfilled]: (state, action) => {
      state.loading = false;
      state.undoPayments = action.payload;
    },
    [UndoOrderNewUserInitial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //Get Total Payment
    [GetOrderTotalInitial.pending]: (state, action) => {
      state.loading = true;
    },
    [GetOrderTotalInitial.fulfilled]: (state, action) => {
      state.loading = false;
      state.totalPayment = action.payload;
    },
    [GetOrderTotalInitial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //Edit order_status Payment
    [UpdatePaymentStatusInitial.pending]: (state, action) => {
      state.loading = true;
    },
    [UpdatePaymentStatusInitial.fulfilled]: (state, action) => {
      state.loading = false;
      state.editStatusPayment = action.payload;
    },
    [UpdatePaymentStatusInitial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const Orders = OrderSlice.reducer;
export const { reset } = OrderSlice.actions;
export default Orders;
