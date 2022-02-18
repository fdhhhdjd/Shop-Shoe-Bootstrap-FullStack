import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { GetProductInitial } from "../Redux/ProductSlice";
const ProductApi = (callback, callbackAdmin) => {
  const [callbacks, setCallbacks] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetProductInitial());
  }, [callback, callbacks, search, callbackAdmin]);

  return {
    callbacks: [callbacks, setCallbacks],
    search: [search, setSearch],
  };
};

export default ProductApi;
