import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetFeedbacksInitial } from "../Redux/FeedbackSlice";

const FeedbackApi = (callbackAdmin, refreshTokensAdmin) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (refreshTokensAdmin !== undefined) {
      dispatch(GetFeedbacksInitial({ refreshTokensAdmin }));
    }
  }, [callbackAdmin, refreshTokensAdmin]);
  return {};
};

export default FeedbackApi;
