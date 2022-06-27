import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetVoucherInitial } from "../Redux/VoucherSlice";
const CategoriesApi = (callbackAdmin, refreshTokens, refreshTokensAdmin) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (refreshTokens || refreshTokensAdmin) {
      dispatch(GetVoucherInitial());
    }
  }, [callbackAdmin]);

  return {};
};

export default CategoriesApi;
