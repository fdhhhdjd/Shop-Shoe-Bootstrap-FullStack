import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetVoucherInitial } from "../Redux/VoucherSlice";
const CategoriesApi = (callbackAdmin) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetVoucherInitial());
  }, [callbackAdmin]);

  return {};
};

export default CategoriesApi;
