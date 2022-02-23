import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { GetProductInitial } from "../Redux/ProductSlice";
const ProductApi = (callback, callbackAdmin) => {
  const [callbacks, setCallbacks] = useState(false);
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState([]);
  const [categoriess, setCategoriess] = useState([]);
  const [sort, setSort] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetProductInitial());
  }, [callback, callbacks, search, callbackAdmin]);
  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get(`/api/product/getAll?${categoriess}&${sort}`);
      setProduct(res.data.products);
    };
    getProduct();
  }, [callbackAdmin, categoriess, sort]);
  return {
    callbacks: [callbacks, setCallbacks],
    search: [search, setSearch],
    product: [product, setProduct],
    sort: [sort, setSort],
    categoriess: [categoriess, setCategoriess],
  };
};

export default ProductApi;
