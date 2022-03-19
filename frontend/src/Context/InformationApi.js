import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GetInformationInitial } from "../Redux/InformationAdminSlice";
const InformationApi = (callbackAdmin) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetInformationInitial());
  }, [callbackAdmin]);

  return {};
};

export default InformationApi;
