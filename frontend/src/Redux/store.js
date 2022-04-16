import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import AuthenticationSlice from "./AuthenticationSlice";
import ProductSlice from "./ProductSlice";
import AuthenticationAdminSlice from "../Redux/AuthenticationAdminSlice";
import OrderSlice from "../Redux/OrderSlice";
import CategorySlice from "../Redux/CategoryAdminSlice";
import VoucherSlice from "../Redux/VoucherSlice";
import Info from "./InformationAdminSlice";
import Feedbacks from "./FeedbackSlice";
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
    order: OrderSlice,
    products: ProductSlice,
    categories: CategorySlice,
    vouchers: VoucherSlice,
    info: Info,
    feedbacks: Feedbacks,
    reducer: rootReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
