import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { GetInformationInitial } from "../Redux/InformationAdminSlice";
const InformationApi = (callbackAdmin) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetInformationInitial());
  }, [callbackAdmin]);

  return {};
};

export default InformationApi;
