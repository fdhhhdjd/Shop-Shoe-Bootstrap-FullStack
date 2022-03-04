import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const GetVoucherInitial = createAsyncThunk(
  "Voucher/getAllVoucher",
  async () => {
    const response = await axios.get("/api/voucher/vouchers");
    return response.data;
  }
);
export const CreateVoucherInitial = createAsyncThunk(
  "Voucher/createVoucher",
  async ({ token, title, value }) => {
    const response = await axios.post(
      "/api/voucher/vouchers",
      { title, value },
      {
        headers: { Authorization: token },
      }
    );
    return response.data;
  }
);
export const UpdateVoucherInitial = createAsyncThunk(
  "Voucher/UpdateVoucher",
  async ({ token, id, title, value }) => {
    const response = await axios.patch(
      `/api/voucher/vouchers/${id}`,
      { title, value },
      {
        headers: { Authorization: token },
      }
    );
    return response.data;
  }
);
export const DeleteVoucherInitial = createAsyncThunk(
  "Voucher/DeleteVoucher",
  async ({ token, id }) => {
    const response = await axios.delete(`/api/voucher/vouchers/${id}`, {
      headers: { Authorization: token },
    });
    return response.data;
  }
);
export const GetTotalVoucherInitial = createAsyncThunk(
  "Voucher/TotalVoucher",
  async ({ token, voucher_code }) => {
    const response = await axios.post(
      "/api/voucher/totalCart",
      { voucher_code },
      {
        headers: { Authorization: token },
      }
    );
    return response.data;
  }
);
const initialState = {
  loadings: false,
  error: null,
  Voucher: [],
  createVoucher: [],
  deleteVoucher: [],
  updateVoucher: [],
  totals: [],
  Message: [],
};
const VoucherSlice = createSlice({
  name: "Voucher",
  initialState,
  reducers: {
    reset: (state) => {
      state.createVoucher = [];
      state.deleteVoucher = [];
      state.updateVoucher = [];
      state.Message = [];
    },
  },
  extraReducers: {
    //Get All Voucher
    [GetVoucherInitial.pending]: (state, action) => {
      state.loadings = true;
    },
    [GetVoucherInitial.fulfilled]: (state, action) => {
      state.loadings = false;
      state.Voucher = action.payload;
    },
    [GetVoucherInitial.rejected]: (state, action) => {
      state.loadings = false;
      state.error = action.payload;
    },
    //create Voucher
    [CreateVoucherInitial.pending]: (state, action) => {
      state.loadings = true;
    },
    [CreateVoucherInitial.fulfilled]: (state, action) => {
      state.loadings = false;
      state.createVoucher = action.payload;
    },
    [CreateVoucherInitial.rejected]: (state, action) => {
      state.loadings = false;
      state.error = action.payload;
    },
    //update Voucher
    [UpdateVoucherInitial.pending]: (state, action) => {
      state.loadings = true;
    },
    [UpdateVoucherInitial.fulfilled]: (state, action) => {
      state.loadings = false;
      state.updateVoucher = action.payload;
    },
    [UpdateVoucherInitial.rejected]: (state, action) => {
      state.loadings = false;
      state.error = action.payload;
    },
    // Delete Voucher
    [DeleteVoucherInitial.pending]: (state, action) => {
      state.loadings = true;
    },
    [DeleteVoucherInitial.fulfilled]: (state, action) => {
      state.loadings = false;
      state.deleteVoucher = action.payload;
    },
    [DeleteVoucherInitial.rejected]: (state, action) => {
      state.loadings = false;
      state.error = action.payload;
    },
    // Delete Voucher
    [GetTotalVoucherInitial.pending]: (state, action) => {
      state.loadings = true;
    },
    [GetTotalVoucherInitial.fulfilled]: (state, action) => {
      state.loadings = false;
      state.totals = action.payload;
      state.Message = action.payload;
    },
    [GetTotalVoucherInitial.rejected]: (state, action) => {
      state.loadings = false;
      state.error = action.payload;
    },
    // History order
  },
});
const Voucher = VoucherSlice.reducer;
export const { reset } = VoucherSlice.actions;
export default Voucher;
