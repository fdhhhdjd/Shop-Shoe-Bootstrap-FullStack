import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  GetProductInitial,
  HistoryProductDetailInitial,
} from "../Redux/ProductSlice";
const OrderApi = (refreshTokens, callback) => {
  const [callbacks, setCallbacks] = useState(false);
  const dispatch = useDispatch();
  const token = refreshTokens;

  useEffect(() => {
    if (token) {
      dispatch(HistoryProductDetailInitial({ token }));
    }
  }, [callback, token]);

  return {
    callbacks: [callbacks, setCallbacks],
  };
};

export default OrderApi;
