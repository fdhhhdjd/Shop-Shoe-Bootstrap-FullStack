import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const DeleteCacheRedisInitial = createAsyncThunk(
  "RedisCache/RedisCache",
  async ({ key }) => {
    const response = await axios.post("/api/redis/cache", { key });
    return response.data;
  }
);
const initialState = {
  loadings: false,
  error: null,
  redisCache: [],
};
const RedisCachesSlice = createSlice({
  name: "RedisCache",
  initialState,
  reducers: {},
  extraReducers: {
    //Get All Product
    [DeleteCacheRedisInitial.pending]: (state, action) => {
      state.loadings = true;
    },
    [DeleteCacheRedisInitial.fulfilled]: (state, action) => {
      state.loadings = false;
      state.redisCache = action.payload;
    },
    [DeleteCacheRedisInitial.rejected]: (state, action) => {
      state.loadings = false;
      state.error = action.payload;
    },
  },
});
const RedisCaches = RedisCachesSlice.reducer;
export const { reset } = RedisCachesSlice.actions;
export default RedisCaches;
