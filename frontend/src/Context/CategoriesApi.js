import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { GetCategoriesInitial } from "../Redux/CategoryAdminSlice";
const CategoriesApi = (callbackAdmin) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetCategoriesInitial());
  }, [callbackAdmin]);

  return {};
};

export default CategoriesApi;
