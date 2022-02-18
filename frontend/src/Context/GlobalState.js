import React, { createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserApi from "./UserApi";
import { RefreshTokenInitiate } from "../Redux/AuthenticationSlice";
import ProductApi from "./ProductApi";
import OrderApi from "./OrderApi";
import { RefreshTokenAdminInitial } from "../Redux/AuthenticationAdminSlice";
export const GlobalState = createContext();
export const DataProvider = ({ children }) => {
  const [callback, setCallback] = useState(false);
  const [callbackAdmin, setCallbackAdmin] = useState(false);
  const dispatch = useDispatch();
  const { auth, refreshToken } = useSelector((state) => ({ ...state.data }));
  const { admin, refreshTokenAdmin } = useSelector((state) => ({
    ...state.admin,
  }));
  const token = auth.accessToken;
  const tokenAdmin = admin.accessToken;
  const refreshTokens = refreshToken.accessToken;
  const refreshTokensAdmin = refreshTokenAdmin.accessToken;
  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const refreshToken = async () => {
        dispatch(RefreshTokenInitiate({ token }));
        setTimeout(() => {
          refreshToken();
        }, 10 * 60 * 1000);
      };
      refreshToken();
    }
  }, [callback]);
  //!Admin
  useEffect(() => {
    const firstLogins = localStorage.getItem("firstLoginAdmin");
    if (firstLogins) {
      const refreshToken = async () => {
        dispatch(RefreshTokenAdminInitial({ tokenAdmin }));
        setTimeout(() => {
          refreshToken();
        }, 10 * 60 * 1000);
      };
      refreshToken();
    }
  }, [callbackAdmin]);
  ProductApi();

  const data = {
    callback: [callback, setCallback],
    callbackAdmin: [callbackAdmin, setCallbackAdmin],
    UserApi: UserApi(refreshTokens, refreshTokensAdmin),
    ProductApi: ProductApi(callback, callbackAdmin),
    OrderApi: OrderApi(refreshTokens, callback),
  };
  return <GlobalState.Provider value={data}>{children}</GlobalState.Provider>;
};
