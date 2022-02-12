import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Header } from "../../imports/index";
import {
  GetProductDetailInitial,
  ReviewProductDetailInitial,
} from "../../Redux/ProductSlice";
import { Loading, Rating, MetaData } from "../../imports/index";
import { Link } from "react-router-dom";
import Message from "../../Pages/Error/Message";
import moment from "moment";
import { GlobalState } from "../../Context/GlobalState";
const DetailProduct = () => {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const state = useContext(GlobalState);
  const [callbacks, setCallbacks] = state.ProductApi.callbacks;
  const { loadings, productDetail, error, reviews } = useSelector((state) => ({
    ...state.products,
  }));
  const { loading, profile, refreshToken } = useSelector((state) => ({
    ...state.data,
  }));
  const token = refreshToken.accessToken;
  useEffect(() => {
    if (id) {
      dispatch(GetProductDetailInitial(id));
    }
  }, [id, reviews]);
  const AddToCartHandle = () => {};
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(ReviewProductDetailInitial({ id, token, rating, comment }));
    setCallbacks(!callbacks);
  };
  return (
    <>
      <Header />
      {productDetail.product && (
        <MetaData title={`${productDetail.product.name}`} />
      )}
      <div className="container single-product">
        {loadings ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            {productDetail.product && (
              <div className="row">
                <div className="col-md-6">
                  <div className="single-image">
                    <img
                      src={productDetail.product.image.url}
                      alt={productDetail.product.name}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="product-dtl">
                    <div className="product-info">
                      <div className="product-name">
                        {productDetail.product.name}
                      </div>
                    </div>
                    <p>{productDetail.product.description}</p>

                    <div className="product-count col-lg-7 ">
                      <div className="flex-box d-flex justify-content-between align-items-center">
                        <h6>Price</h6>
                        <span>${productDetail.product.price}</span>
                      </div>
                      <div className="flex-box d-flex justify-content-between align-items-center">
                        <h6>Status</h6>
                        {productDetail.product.countInStock > 0 ? (
                          <span>In Stock</span>
                        ) : (
                          <span>unavailable</span>
                        )}
                      </div>
                      <div className="flex-box d-flex justify-content-between align-items-center">
                        <h6>Reviews</h6>
                        <Rating
                          value={productDetail.product.rating}
                          text={`${productDetail.product.numReviews} reviews`}
                        />
                      </div>
                      {productDetail.product.countInStock > 0 ? (
                        <>
                          <div className="flex-box d-flex justify-content-between align-items-center">
                            <h6>Quantity</h6>
                            <select
                            // value={qty}
                            // onChange={(e) => setQty(e.target.value)}
                            >
                              {[
                                ...Array(
                                  productDetail.product.countInStock
                                ).keys(),
                              ].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </select>
                          </div>
                          <button
                            onClick={AddToCartHandle}
                            className="round-black-btn"
                          >
                            Add To Cart
                          </button>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* RATING */}
            {productDetail.product && (
              <div className="row my-5">
                <div className="col-md-6">
                  <h6 className="mb-3">REVIEWS</h6>
                  {productDetail.product.reviews.length === 0 && (
                    <Message variant={"alert-info mt-3"}>No Reviews</Message>
                  )}
                  {productDetail.product.reviews.map((review) => (
                    <div
                      key={review._id}
                      className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
                    >
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <span>{moment(review.createdAt).calendar()}</span>
                      <div className="alert alert-info mt-3">
                        {review.comment}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="col-md-6">
                  <h6>WRITE A CUSTOMER REVIEW</h6>
                  <div className="my-4">
                    {loadings && <Loading />}

                    {reviews.status === 400 && (
                      <Message variant="alert-danger">{reviews.msg}</Message>
                    )}
                  </div>
                  {profile.user ? (
                    <form onSubmit={submitHandler}>
                      <div className="my-4">
                        <strong>Rating</strong>
                        <select
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          className="col-12 bg-light p-3 mt-2 border-0 rounded"
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </select>
                      </div>
                      <div className="my-4">
                        <strong>Comment</strong>
                        <textarea
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="col-12 bg-light p-3 mt-2 border-0 rounded"
                        ></textarea>
                      </div>
                      <div className="my-3">
                        <button
                          disabled={loadings}
                          className="col-12 bg-black border-0 p-3 rounded text-white"
                        >
                          SUBMIT
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="my-3">
                      <Message variant={"alert-warning"}>
                        Please{" "}
                        <Link to="/login">
                          " <strong>Login</strong> "
                        </Link>{" "}
                        to write a review{" "}
                      </Message>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default DetailProduct;
