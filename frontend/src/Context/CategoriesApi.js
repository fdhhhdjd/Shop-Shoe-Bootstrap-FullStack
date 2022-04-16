import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetCategoriesInitial } from "../Redux/CategoryAdminSlice";
const CategoriesApi = (callbackAdmin) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetCategoriesInitial());
  }, [callbackAdmin]);

  return {};
};

export default CategoriesApi;
