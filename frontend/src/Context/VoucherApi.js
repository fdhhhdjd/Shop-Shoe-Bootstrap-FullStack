import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { GetVoucherInitial } from "../Redux/VoucherSlice";
const CategoriesApi = (callbackAdmin) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetVoucherInitial());
  }, [callbackAdmin]);

  return {};
};

export default CategoriesApi;
