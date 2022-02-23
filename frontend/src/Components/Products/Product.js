import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../../Context/GlobalState";
import swal from "sweetalert";
import axios from "axios";
const Product = (props) => {
  const { product, handleCheck } = props;
  const { refreshTokenAdmin } = useSelector((state) => ({
    ...state.admin,
  }));
  const state = useContext(GlobalState);
  const [callbackAdmin, setCallbackAdmin] = state.callbackAdmin;
  const [callback, setCallback] = state.callback;

  const [loading, setLoading] = useState(false);
  const HandleDeleteProduct = async (id) => {
    try {
      setLoading(true);
      return await swal({
        title: "Are you sure you want delete ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.delete(`/api/product/delete/${id}`, {
            headers: { Authorization: ` ${refreshTokenAdmin.accessToken}` },
          });
          setCallback(!callback);
          setCallbackAdmin(!callbackAdmin);
          setLoading(false);
          swal("Delete successfully, wait Loading... 😉 !", {
            icon: "success",
          });
        } else {
          swal("Thank you for 😆'!");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="col-md-6 col-sm-6 col-lg-3 mb-5">
        <div className="card card-product-grid shadow-sm">
          <input
            type="checkbox"
            className="text-success form-check-input "
            style={{ marginLeft: "0.7rem", fontSize: "1.5rem" }}
            onChange={() => handleCheck(product._id)}
            checked={product.checked}
          />
          <Link to="#" className="img-wrap">
            <img src={product.image && product.image.url} alt="Product" />
          </Link>
          <div className="info-wrap">
            <Link to="#" className="title text-truncate">
              {product.name}
            </Link>
            <div className="price mb-2">${product.price}</div>
            <div className="row">
              <Link
                to={`/editProduct/${product._id}`}
                className="btn btn-sm btn-outline-success p-2 pb-3 col-md-6"
              >
                <i className="fas fa-pen"></i>
              </Link>
              <Link
                to="#"
                onClick={() => HandleDeleteProduct(product._id)}
                className="btn btn-sm btn-outline-danger p-2 pb-3 col-md-6"
              >
                <i className="fas fa-trash-alt"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
