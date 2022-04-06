import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RefreshTokenAdminInitial } from "../Redux/AuthenticationAdminSlice";
import { RefreshTokenInitiate } from "../Redux/AuthenticationSlice";
import CategoriesApi from "./CategoriesApi";
import FeedbackApi from "./FeedbackApi";
import InformationApi from "./InformationApi";
import OrderApi from "./OrderApi";
import ProductApi from "./ProductApi";
import UserApi from "./UserApi";
import VoucherApi from "./VoucherApi";
export const GlobalState = createContext();
export const DataProvider = ({ children }) => {
  const [callback, setCallback] = useState(false);
  const [callbackAdmin, setCallbackAdmin] = useState(false);
  const dispatch = useDispatch();
  const { auth, refreshToken } = useSelector((state) => ({ ...state.data }));
  const { admin, refreshTokenAdmin } = useSelector((state) => ({
    ...state.admin,
  }));
  const [rememberer, setRememberMe] = useState(false);
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
    OrderApi: OrderApi(
      refreshTokens,
      refreshTokensAdmin,
      callback,
      callbackAdmin
    ),
    remember: [rememberer, setRememberMe],
    CategoriesApi: CategoriesApi(callbackAdmin),
    InformationApi: InformationApi(callbackAdmin),
    VoucherApi: VoucherApi(callbackAdmin),
    FeedbackApi: FeedbackApi(callbackAdmin, refreshTokensAdmin),
  };
  return <GlobalState.Provider value={data}>{children}</GlobalState.Provider>;
};
