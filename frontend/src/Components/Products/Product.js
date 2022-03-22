import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDelete } from "../../imports";
import { deleteProduct } from "../../imports/Import";
const Product = (props) => {
  const { product, handleCheck } = props;
  const { refreshTokenAdmin } = useSelector((state) => ({
    ...state.admin,
  }));
  const { mutate } = useDelete();
  const HandleDeleteProduct = async (id) => {
    mutate(() => deleteProduct(id, refreshTokenAdmin.accessToken));
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
