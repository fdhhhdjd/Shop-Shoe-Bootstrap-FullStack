import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { ProfileInitiate } from "../Redux/AuthenticationSlice";
const UserApi = (token) => {
  const dispatch = useDispatch();
  useEffect(() => {
    token && dispatch(ProfileInitiate({ token }));
  }, [token]);

  return {};
};
export default UserApi;
