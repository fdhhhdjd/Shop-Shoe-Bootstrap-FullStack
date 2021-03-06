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
  async ({ fullname, email, content, subject }) => {
    const response = await axios.post("/api/feedback/send", {
      fullname,
      email,
      content,
      subject,
    });
    return response.data;
  }
);
export const ReadingFeedbacksInitial = createAsyncThunk(
  "Feedbacks/Reading",
  async (id) => {
    const response = await axios.get(`/api/feedback/reading/${id}`);
    return response.data;
  }
);
export const SearchDateInitial = createAsyncThunk(
  "Feedbacks/SearchDate",
  async ({ DateFrom, DateTo }) => {
    const response = await axios.post(`/api/feedback/search`, {
      search_text: "",
      DateFrom,
      DateTo,
      limit: 100,
      page: 1,
    });
    return response.data;
  }
);
export const FilterSeenAndNotSeenInitial = createAsyncThunk(
  "Feedbacks/FilterSeenAndNotSeen",
  async ({ sort }) => {
    const response = await axios.post(`/api/feedback/filterEmail`, {
      checked: sort,
    });
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
    //Reading Feedback
    [ReadingFeedbacksInitial.pending]: (state, action) => {
      state.loading = true;
    },
    [ReadingFeedbacksInitial.fulfilled]: (state, action) => {
      state.loading = false;
    },
    [ReadingFeedbacksInitial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //Search Date Feedback
    [SearchDateInitial.pending]: (state, action) => {
      state.loading = true;
    },
    [SearchDateInitial.fulfilled]: (state, action) => {
      state.loading = false;
      state.feedback = action.payload;
    },
    [SearchDateInitial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //Filter Feedback
    [FilterSeenAndNotSeenInitial.pending]: (state, action) => {
      state.loading = true;
    },
    [FilterSeenAndNotSeenInitial.fulfilled]: (state, action) => {
      state.loading = false;
      state.feedback = action.payload;
    },
    [FilterSeenAndNotSeenInitial.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
const Feedbacks = FeedbacksSlice.reducer;
export const { reset } = FeedbacksSlice.actions;
export default Feedbacks;
