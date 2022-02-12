import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading, Rating } from "../../imports/index";
import Message from "../../Pages/Error/Message";
import { Link } from "react-router-dom";
const ShopSection = () => {
  const { loading, product, error } = useSelector((state) => ({
    ...state.products,
  }));
  return (
    <>
      <div className="container">
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {loading ? (
                  <div className="mb-5">
                    <Loading />
                  </div>
                ) : error ? (
                  <Message variant="alert-danger">{error}</Message>
                ) : (
                  <>
                    {product.products &&
                      product.products.map((product) => (
                        <div
                          className="shop col-lg-4 col-md-6 col-sm-6"
                          key={product._id}
                        >
                          <div className="border-product">
                            <Link to={`/products/${product._id}`}>
                              <div className="shopBack">
                                {product.image && (
                                  <img
                                    src={product.image.url}
                                    alt={product.name}
                                  />
                                )}
                              </div>
                            </Link>

                            <div className="shoptext">
                              <p>
                                <Link to={`/products/${product._id}`}>
                                  {product.name}
                                </Link>
                              </p>

                              <Rating
                                value={product.rating}
                                text={`${product.numReviews} reviews`}
                              />
                              <h3>${product.price}</h3>
                            </div>
                          </div>
                        </div>
                      ))}
                  </>
                )}

                {/* Pagination */}
                {/* <Pagination
                  pages={pages}
                  page={page}
                  keyword={keyword ? keyword : ""}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSection;
