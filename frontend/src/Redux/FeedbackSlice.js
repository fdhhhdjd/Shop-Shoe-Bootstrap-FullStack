import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const GetFeedbacksInitial = createAsyncThunk(
  "Feedbacks/getAllFeedback",
  async ({ refreshTokensAdmin }) => {
    const response = await axios.get("/api/feedback/all", {
      headers: { Authorization: refreshTokensAdmin },
    });
    return response.data;
  }
);
export const ReplyFeedbacksInitial = createAsyncThunk(
  "Feedbacks/ReplyFeedback",
  async ({ id, token, response_content }) => {
    const response = await axios.post(
      `/api/feedback/response/${id}`,
      { response_content },
      {
        headers: { Authorization: token },
      }
    );
    return response.data;
  }
);
export const SendFeedbacksInitial = createAsyncThunk(
  "Feedbacks/SendFeedback",
  async ({ ...state }) => {
    const response = await axios.post("/api/feedback/send", { ...state });
    return response.data;
  }
);
const initialState = {
  loading: false,
  error: null,
  feedback: [],
  replyFeedback: [],
  sendFeedback: [],
};
const FeedbacksSlice = createSlice({
  name: "Feedbacks",
  initialState,
  reducers: {
    reset: (state) => {
      state.replyFeedback = [];
      state.sendFeedback = [];
    },
  },
  extraReducers: {
    //Get All Feedback
    [GetFeedbacksInitial.pending]: (state, action) => {
      state.loading = true;
    },
    [GetFeedbacksInitial.fulfilled]: (state, action) => {
      state.loading = false;
      state.feedback = action.payload;
    },
    [GetFeedbacksInitial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //Reply Feedback
    [ReplyFeedbacksInitial.pending]: (state, action) => {
      state.loading = true;
    },
    [ReplyFeedbacksInitial.fulfilled]: (state, action) => {
      state.loading = false;
      state.replyFeedback = action.payload;
    },
    [ReplyFeedbacksInitial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //Customer Feedback
    [SendFeedbacksInitial.pending]: (state, action) => {
      state.loading = true;
    },
    [SendFeedbacksInitial.fulfilled]: (state, action) => {
      state.loading = false;
      state.sendFeedback = action.payload;
    },
    [SendFeedbacksInitial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const Feedbacks = FeedbacksSlice.reducer;
export const { reset } = FeedbacksSlice.actions;
export default Feedbacks;
