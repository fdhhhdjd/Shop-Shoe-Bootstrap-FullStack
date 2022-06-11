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
export const RevenueReceivedMonthBeforeInitial = createAsyncThunk(
  "order/RevenueReceivedMonthBefore",
  async ({ tokens }) => {
    const response = await axios.get(
      "/api/payment/orders/customerReceived/getIncomeThisMonthAndCompareTo",
      {
        headers: { Authorization: tokens },
      }
    );
    return response.data;
  }
);
export const RevenueNotReceivedMonthBeforeInitial = createAsyncThunk(
  "order/RevenueNotReceivedMonthBefore",
  async ({ tokens }) => {
    const response = await axios.get(
      "/api/payment/orders/customerNotReceived/getIncomeThisMonthAndCompareTo",
      {
        headers: { Authorization: tokens },
      }
    );
    return response.data;
  }
);
export const RevenueReceivedEveryMonthInitial = createAsyncThunk(
  "order/RevenueReceivedEveryMonthInitial",
  async ({ tokens }) => {
    const response = await axios.get(
      "/api/payment/orders/customerReceived/getMonthlyIncome",
      {
        headers: { Authorization: tokens },
      }
    );
    return response.data;
  }
);
export const StripeInitial = createAsyncThunk(
  "order/Stripe",
  async ({ cartItems, userId, email }) => {
    const response = await axios.post("/api/payment/paymentStripe", {
      cartItems,
      userId,
      email,
    });
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
  RevenueReceivedMonthBefore: [],
  RevenueNotReceivedMonthBefore: [],
  RevenueReceivedEveryMonth: [],
  paymentStripe: [],
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
    //Get Total Payment
    [StripeInitial.pending]: (state, action) => {
      state.loading = true;
    },
    [StripeInitial.fulfilled]: (state, action) => {
      state.loading = false;
      state.paymentStripe = action.payload;
    },
    [StripeInitial.rejected]: (state, action) => {
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
    //Get Money Revenue Month Before Initial (Received)
    [RevenueReceivedMonthBeforeInitial.pending]: (state, action) => {
      state.loading = true;
    },
    [RevenueReceivedMonthBeforeInitial.fulfilled]: (state, action) => {
      state.loading = false;
      state.RevenueReceivedMonthBefore = action.payload;
    },
    [RevenueReceivedMonthBeforeInitial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //Get Money Revenue Month Before Initial (Not received)
    [RevenueNotReceivedMonthBeforeInitial.pending]: (state, action) => {
      state.loading = true;
    },
    [RevenueNotReceivedMonthBeforeInitial.fulfilled]: (state, action) => {
      state.loading = false;
      state.RevenueNotReceivedMonthBefore = action.payload;
    },
    [RevenueNotReceivedMonthBeforeInitial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //Successfully shipped invoice revenue each month (Success Received)
    [RevenueReceivedEveryMonthInitial.pending]: (state, action) => {
      state.loading = true;
    },
    [RevenueReceivedEveryMonthInitial.fulfilled]: (state, action) => {
      state.loading = false;
      state.RevenueReceivedEveryMonth = action.payload;
    },
    [RevenueReceivedEveryMonthInitial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const Orders = OrderSlice.reducer;
export const { reset } = OrderSlice.actions;
export default Orders;
