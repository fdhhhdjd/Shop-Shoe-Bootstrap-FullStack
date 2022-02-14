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
export const updateReviewProductDetailInitial = createAsyncThunk(
  "product/updateReview",
  async ({ productId, commentId, token, comment }) => {
    console.log(
      productId,
      "1",
      commentId,
      "2",
      token,
      "3",

      comment,
      "5"
    );
    const response = await axios.put(
      `/api/product/${productId}/update/review/${commentId}`,
      {
        comment,
      },
      {
        headers: { Authorization: token },
      }
    );
    return response.data;
  }
);
export const DeleteProductDetailInitial = createAsyncThunk(
  "product/DeleteReview",
  async ({ productId, commentId, token }) => {
    console.log(productId, commentId, token, "redux");
    const response = await axios.delete(
      `/api/product/${productId}/delete/review/${commentId}`,
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
  updateReview: [],
  cartItems: [],
  deleteReview: [],
};
const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: (state) => {
      state.productDetail = [];
      state.reviews = [];
      state.deleteReview = [];
    },
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
    // Edit Review Product
    [updateReviewProductDetailInitial.pending]: (state, action) => {
      state.loadings = true;
    },
    [updateReviewProductDetailInitial.fulfilled]: (state, action) => {
      state.loadings = false;
      state.updateReview = action.payload;
    },
    [updateReviewProductDetailInitial.rejected]: (state, action) => {
      state.loadings = false;
      state.error = action.payload;
    },
    // Delete Review Product
    [DeleteProductDetailInitial.pending]: (state, action) => {
      state.loadings = true;
    },
    [DeleteProductDetailInitial.fulfilled]: (state, action) => {
      state.loadings = false;
      state.updateReview = action.payload;
    },
    [DeleteProductDetailInitial.rejected]: (state, action) => {
      state.loadings = false;
      state.error = action.payload;
    },
  },
});
const Products = ProductSlice.reducer;
export const { reset } = ProductSlice.actions;
export default Products;
