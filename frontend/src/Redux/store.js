import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import AuthenticationSlice from "./AuthenticationSlice";
import ProductSlice from "./ProductSlice";
const rootReducer = (state, action) => {
  if (action.type === "counter/clear") {
    state = undefined;
  }
  return AuthenticationSlice(state, action);
};
const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
  },
};
const store = configureStore({
  reducer: {
    data: AuthenticationSlice,
    products: ProductSlice,
    reducer: rootReducer,
    initialState,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
