import React, { useState } from "react";
import { Link } from "react-router-dom";

const RelationProduct = ({ product: { image, name, slug, price, _id } }) => {
  return (
    <div>
      <Link to={`/products/${_id}`}>
        <div className="product-card">
          <img
            src={image.url}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name123">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default RelationProduct;
