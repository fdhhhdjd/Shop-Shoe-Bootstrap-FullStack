import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  GetProductInitial,
  HistoryProductDetailInitial,
} from "../Redux/ProductSlice";
import {
  GetDeleteOrderInitial,
  GetOrderInitial,
  GetOrderNewUserInitial,
} from "../Redux/OrderSlice";
const OrderApi = (
  refreshTokens,
  refreshTokensAdmin,
  callback,
  callbackAdmin
) => {
  const [callbacks, setCallbacks] = useState(false);
  const dispatch = useDispatch();
  const token = refreshTokens;
  const tokens = refreshTokensAdmin;

  useEffect(() => {
    if (token) {
      dispatch(HistoryProductDetailInitial({ token }));
    }
  }, [callback, token, callbackAdmin]);
  useEffect(() => {
    if (tokens) {
      dispatch(GetOrderInitial({ tokens }));
      dispatch(GetDeleteOrderInitial({ tokens }));
      dispatch(GetOrderNewUserInitial({ tokens }));
    }
  }, [callback, tokens, callbackAdmin]);

  return {
    callbacks: [callbacks, setCallbacks],
  };
};

export default OrderApi;
