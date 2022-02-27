import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const GetCategoriesInitial = createAsyncThunk(
  "Categories/getAllCategory",
  async () => {
    const response = await axios.get("/api/category/categorys");
    return response.data;
  }
);
export const CreateCategoriesInitial = createAsyncThunk(
  "Categories/createCategory",
  async ({ token, name, image, images }) => {
    const response = await axios.post(
      "/api/category/categorys",
      { name, image: images },
      {
        headers: { Authorization: token },
      }
    );
    return response.data;
  }
);
export const UpdateCategoriesInitial = createAsyncThunk(
  "Categories/UpdateCategory",
  async ({ token, id, name, image, images }) => {
    const response = await axios.patch(
      `/api/category/categorys/${id}`,
      { name, image: images },
      {
        headers: { Authorization: token },
      }
    );
    return response.data;
  }
);
export const DeleteCategoriesInitial = createAsyncThunk(
  "Categories/DeleteCategory",
  async ({ token, id }) => {
    const response = await axios.delete(`/api/category/categorys/${id}`, {
      headers: { Authorization: token },
    });
    return response.data;
  }
);
const initialState = {
  loadings: false,
  error: null,
  category: [],
  createCategory: [],
  deleteCategory: [],
  updateCategory: [],
};
const CategoriesSlice = createSlice({
  name: "Categories",
  initialState,
  reducers: {
    reset: (state) => {
      state.createCategory = [];
      state.deleteCategory = [];
      state.updateCategory = [];
    },
  },
  extraReducers: {
    //Get All category
    [GetCategoriesInitial.pending]: (state, action) => {
      state.loadings = true;
    },
    [GetCategoriesInitial.fulfilled]: (state, action) => {
      state.loadings = false;
      state.category = action.payload;
    },
    [GetCategoriesInitial.rejected]: (state, action) => {
      state.loadings = false;
      state.error = action.payload;
    },
    //create category
    [CreateCategoriesInitial.pending]: (state, action) => {
      state.loadings = true;
    },
    [CreateCategoriesInitial.fulfilled]: (state, action) => {
      state.loadings = false;
      state.createCategory = action.payload;
    },
    [CreateCategoriesInitial.rejected]: (state, action) => {
      state.loadings = false;
      state.error = action.payload;
    },
    //update category
    [UpdateCategoriesInitial.pending]: (state, action) => {
      state.loadings = true;
    },
    [UpdateCategoriesInitial.fulfilled]: (state, action) => {
      state.loadings = false;
      state.updateCategory = action.payload;
    },
    [UpdateCategoriesInitial.rejected]: (state, action) => {
      state.loadings = false;
      state.error = action.payload;
    },
    // Delete category
    [DeleteCategoriesInitial.pending]: (state, action) => {
      state.loadings = true;
    },
    [DeleteCategoriesInitial.fulfilled]: (state, action) => {
      state.loadings = false;
      state.deleteCategory = action.payload;
    },
    [DeleteCategoriesInitial.rejected]: (state, action) => {
      state.loadings = false;
      state.error = action.payload;
    },
    // History order
  },
});
const Categories = CategoriesSlice.reducer;
export const { reset } = CategoriesSlice.actions;
export default Categories;
