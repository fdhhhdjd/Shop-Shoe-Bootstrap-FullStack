import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../imports/Import";
import { GetProductInitial } from "../Redux/ProductSlice";
const ProductApi = (callback, callbackAdmin, runProduct) => {
  const [callbacks, setCallbacks] = useState(false);
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState([]);
  const [categoriess, setCategoriess] = useState("");
  const [sort, setSort] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetProductInitial());
  }, [callback, callbacks]);
  useEffect(() => {
    const getProduct = async () => {
      const res = await axios.get(getProducts(categoriess, sort));
      setProduct(res.data.products);
    };
    getProduct();
  }, [callbackAdmin, categoriess, sort, runProduct]);
  return {
    callbacks: [callbacks, setCallbacks],
    search: [search, setSearch],
    product: [product, setProduct],
    sort: [sort, setSort],
    categoriess: [categoriess, setCategoriess],
  };
};

export default ProductApi;
