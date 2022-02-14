import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { GetProductInitial } from "../Redux/ProductSlice";
const ProductApi = (callback) => {
  const [callbacks, setCallbacks] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetProductInitial());
  }, [callback]);

  return {
    callbacks: [callbacks, setCallbacks],
  };
};

export default ProductApi;
