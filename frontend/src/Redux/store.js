import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import AuthenticationSlice from "./AuthenticationSlice";
import ProductSlice from "./ProductSlice";
import AuthenticationAdminSlice from "../Redux/AuthenticationAdminSlice";
const rootReducer = (state, action) => {
  if (action.type === "counter/clear") {
    state = undefined;
  }
  return AuthenticationSlice(state, action);
};
const store = configureStore({
  reducer: {
    data: AuthenticationSlice,
    admin: AuthenticationAdminSlice,
    products: ProductSlice,
    reducer: rootReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
