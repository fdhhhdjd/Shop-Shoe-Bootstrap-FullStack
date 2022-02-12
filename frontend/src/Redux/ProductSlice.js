import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const GetProductInitial = createAsyncThunk(
  "product/getAllProduct",
  async () => {
    const response = await axios.get("/api/product/getAll");
    return response.data;
  }
);
export const GetProductDetailInitial = createAsyncThunk(
  "product/getProductDetail",
  async (id) => {
    const response = await axios.get(`/api/product/getId/${id}`);
    return response.data;
  }
);
export const ReviewProductDetailInitial = createAsyncThunk(
  "product/review",
  async ({ id, token, rating, comment }) => {
    const response = await axios.post(
      `/api/product/review/${id}`,
      {
        rating,
        comment,
      },
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
  product: [],
  productDetail: [],
  reviews: [],
};
const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: (state) => {},
  },
  extraReducers: {
    //Get All Product
    [GetProductInitial.pending]: (state, action) => {
      state.loadings = true;
    },
    [GetProductInitial.fulfilled]: (state, action) => {
      state.loadings = false;
      state.product = action.payload;
    },
    [GetProductInitial.rejected]: (state, action) => {
      state.loadings = false;
      state.error = action.payload;
    },
    //Get Product Detail
    [GetProductDetailInitial.pending]: (state, action) => {
      state.loadings = true;
    },
    [GetProductDetailInitial.fulfilled]: (state, action) => {
      state.loadings = false;
      state.productDetail = action.payload;
    },
    [GetProductDetailInitial.rejected]: (state, action) => {
      state.loadings = false;
      state.error = action.payload;
    },
    //Review Product
    [ReviewProductDetailInitial.pending]: (state, action) => {
      state.loadings = true;
    },
    [ReviewProductDetailInitial.fulfilled]: (state, action) => {
      state.loadings = false;
      state.reviews = action.payload;
    },
    [ReviewProductDetailInitial.rejected]: (state, action) => {
      state.loadings = false;
      state.error = action.payload;
    },
  },
});
const Products = ProductSlice.reducer;
export const { reset } = ProductSlice.actions;
export default Products;
