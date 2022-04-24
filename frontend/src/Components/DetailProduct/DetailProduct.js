import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Header, RelationProduct } from "../../imports/index";
import { RelatedProductStyle } from "../../Styles/RelatedProductStyle";
import {
  GetProductDetailInitial,
  reset,
  ReviewProductDetailInitial,
} from "../../Redux/ProductSlice";
import { Loading, Rating, MetaData } from "../../imports/index";
import Message from "../../Pages/Error/Message";
import { GlobalState } from "../../Context/GlobalState";
import Comments from "./Comments";
import { SwaleMessage, LazyLoadImg } from "../../imports/index";
const initialState = {
  comment: "",
  rating: 0,
};
const DetailProduct = () => {
  const { id } = useParams();
  const [reviewState, setReviewState] = useState(initialState);
  const [user, setUser] = useState();
  const [onEdit, setOnEdit] = useState(false);
  const dispatch = useDispatch();

  const state = useContext(GlobalState);
  const addCart = state.UserApi.addCart;

  const [callback, setCallback] = state.callback;
  const { loadings, productDetail, error, reviews, product } = useSelector(
    (state) => ({
      ...state.products,
    })
  );
  const products = product.products && product.products;

  const { profile, refreshToken } = useSelector((state) => ({
    ...state.data,
  }));
  const { comment, rating } = reviewState;
  const token = refreshToken.accessToken;
  const [visible, setVisible] = useState(4);
  const handleLoadMore = () => {
    setVisible((prev) => prev + 4);
  };
  useEffect(() => {
    if (id) {
      dispatch(GetProductDetailInitial(id));
      getReplies();
      if (reviews.status === 400) {
        return SwaleMessage(reviews.msg, "error");
      }
    }
    return () => {
      dispatch(reset());
    };
  }, [id, product, callback]);
  const getReplies = (commentId) => {
    return (
      productDetail.product &&
      productDetail.product.reviews
        .slice(0, visible)
        .filter((backendComments) => backendComments._id === commentId)
    );
  };
  const productId = id;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewState({ ...reviewState, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!comment) {
      return SwaleMessage("Please Content Comment 🤗 ", "error");
    }
    dispatch(ReviewProductDetailInitial({ id, token, rating, comment }));
    setCallback(!callback);
    setReviewState({ comment: "", rating: 0 });
  };
  useEffect(() => {
    profile.user && setUser(profile.user._id);
  }, [profile]);
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
                  <TransformWrapper
                    initialScale={0.75}
                    initialPositionX={0}
                    initialPositionY={20}
                  >
                    {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                      <React.Fragment>
                        <div className="single-image">
                          <TransformComponent>
                            <LazyLoadImg
                              url={productDetail.product?.image.url}
                            />
                          </TransformComponent>
                        </div>
                        <br />
                        <button
                          className="btn btn-success"
                          onClick={() => zoomIn()}
                        >
                          Zoom In +
                        </button>
                        &nbsp;&nbsp;
                        <button
                          className="btn btn-success"
                          onClick={() => zoomOut()}
                        >
                          Zoom Out -
                        </button>
                        &nbsp;&nbsp;
                        <button
                          className="btn btn-danger"
                          onClick={() => resetTransform()}
                        >
                          Return-X
                        </button>
                        <br />
                        <br />
                      </React.Fragment>
                    )}
                  </TransformWrapper>
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
                          <span>End In Stock</span>
                        )}
                      </div>
                      <div className="flex-box d-flex justify-content-between align-items-center">
                        <h6>Sold</h6>
                        {productDetail.product.sold > 0 ? (
                          <span>{productDetail.product.sold} </span>
                        ) : (
                          <span>No Yet Has Bought</span>
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
                            <h6>CountIn Stock</h6>
                            <span>{productDetail.product.countInStock}</span>
                          </div>
                          <button
                            onClick={() => addCart(productDetail.product)}
                            className="round-black-btn"
                          >
                            Add To Cart
                          </button>
                        </>
                      ) : (
                        <div className="flex-box d-flex justify-content-between align-items-center">
                          <h6>CountIn Stock</h6>
                          <span>Out Of Stock</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <RelatedProductStyle />
            <div className="maylike-products-wrapper">
              <h2>Relation Product Forme </h2>
              <div className="marquee">
                <div className="maylike-products-container track">
                  {products?.map((item) => {
                    console.log(productDetail?.product, "gao do");
                    return item?.categories?._id ===
                      productDetail?.product?.categories ? (
                      <RelationProduct key={item._id} product={item} />
                    ) : null;
                  })}
                </div>
              </div>
            </div>
            {/* RATING */}
            {productDetail.status === 200 && (
              <div className="row my-5">
                <div className="col-md-6">
                  <h6 className="mb-3">REVIEWS</h6>

                  <>
                    {reviews.status === 400 && (
                      <Message variant="alert-danger">{reviews.msg}</Message>
                    )}
                  </>

                  {productDetail.product &&
                    productDetail.product.reviews.map((review, index) => {
                      return (
                        <Comments
                          key={index}
                          replies={getReplies(review._id)}
                          setCallback={setCallback}
                          callback={callback}
                          user={user}
                          productId={productId}
                          token={token}
                          reviewState={reviewState}
                          setReviewState={setReviewState}
                          id={id}
                          setOnEdit={setOnEdit}
                          onEdit={onEdit}
                          productDetail={productDetail}
                          rating={rating}
                          comment={comment}
                          handleChange={handleChange}
                          initialState={initialState}
                          handleLoadMore={handleLoadMore}
                          visible={visible}
                        />
                      );
                    })}
                  <nav
                    className="float-center mt-4"
                    aria-label="Page navigation"
                  >
                    <ul className="pagination  justify-content-center">
                      <li className="page-item">
                        {productDetail.product &&
                          productDetail.product.reviews &&
                          visible < productDetail.product.reviews.length && (
                            <button
                              className="page-link"
                              onClick={handleLoadMore}
                            >
                              Load Comment{" "}
                              <i className="fa-solid fa-angle-down"></i>
                            </button>
                          )}
                      </li>
                    </ul>
                  </nav>
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
                          name="rating"
                          onChange={handleChange}
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
                          name="comment"
                          onChange={handleChange}
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
