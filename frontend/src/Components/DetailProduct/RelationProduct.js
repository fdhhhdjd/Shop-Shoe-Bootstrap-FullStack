import React from "react";
import { Link } from "react-router-dom";
import { except } from "../../imports/importConstant";

const RelationProduct = ({ product: { image, name, price, _id } }) => {
  return (
    <div>
      <Link to={`/products/${_id}`}>
        <div className="product-card">
          <img
            src={image.url}
            width={250}
            height={250}
            className="product-image"
            alt=""
          />
          <p className="product-name123">{except(name, 15)}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default RelationProduct;
