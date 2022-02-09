import React, { createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserApi from "./UserApi";
import { RefreshTokenInitiate } from "../Redux/AuthenticationSlice";
export const GlobalState = createContext();
export const DataProvider = ({ children }) => {
  const [callback, setCallback] = useState(false);
  const dispatch = useDispatch();
  const { auth, refreshToken } = useSelector((state) => ({ ...state.data }));
  const token = auth.accessToken;
  const refreshTokens = refreshToken.accessToken;
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
  const data = {
    // callback: [callback, setCallback],
    UserApi: UserApi(refreshTokens),
  };
  return <GlobalState.Provider value={data}>{children}</GlobalState.Provider>;
};
