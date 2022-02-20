import React, { Fragment, useEffect, useState } from "react";
import Rating from "../Rating/Rating";
import moment from "moment";
import {
  DeleteProductDetailInitial,
  updateReviewProductDetailInitial,
} from "../../Redux/ProductSlice";
import { useDispatch } from "react-redux";
import { reset } from "../../Redux/AuthenticationSlice";
import swal from "sweetalert";
const initialState = {
  comment: "",
};
const Comments = ({
  replies,
  user,
  productId,
  token,
  setCallback,
  callback,
  id,
  setOnEdit,
  onEdit,
}) => {
  const dispatch = useDispatch();
  const [commentReview, setCommentReview] = useState(initialState);
  const [commentId, setCommentId] = useState();
  const [Review, setReview] = useState();
  const { comment } = commentReview;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentReview({ ...commentReview, [name]: value });
  };
  useEffect(() => {
    replies.map((item) => {
      setCommentId(item._id);
      setReview(item.user._id);
    });
    if (onEdit) {
      if (user === Review) {
        replies.map((item) => {
          return setCommentReview({ ...item });
        });
      } else {
        setCommentReview(initialState);
      }
    }
  }, [id, onEdit]);

  const deleteReviewProduct = async (e) => {
    return await swal({
      title: "Are you sure you want delete ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(DeleteProductDetailInitial({ productId, token, commentId }));
        setCallback(!callback);
        swal("Delete Comments successfully 😉 !", {
          icon: "success",
        });
      } else {
        swal("Thank you for 😆'!");
      }
    });
  };

  const updateReviewProduct = (e) => {
    e.preventDefault();
    dispatch(
      updateReviewProductDetailInitial({
        productId,
        token,
        commentId,
        comment,
      })
    );
    setOnEdit(false);
    setCallback(!callback);
  };
  return (
    <>
      {replies.length > 0 && (
        <div className="replies">
          {replies.map((review) => {
            return (
              <Fragment>
                <div
                  key={review._id}
                  className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
                >
                  <strong>
                    {review.user && review.user.image && (
                      <img
                        src={review.user.image.url}
                        alt=""
                        style={{
                          width: "35px",
                          height: "35px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </strong>{" "}
                  &nbsp;&nbsp;
                  <strong>{review.user.name}</strong>
                  <Rating value={review.rating} />
                  <span>{moment(review.updatedAt).calendar()}</span>
                  <div className="flex-box d-flex justify-content-between align-items-center alert alert-info mt-3">
                    {user === review.user._id ? (
                      <>
                        {onEdit ? (
                          <textarea
                            row="3"
                            value={commentReview.comment}
                            name="comment"
                            onChange={handleChange}
                            className="col-10 bg-light p-3 mt-2 border-0 rounded"
                            // className="editInput "
                            style={{ border: "none" }}
                          ></textarea>
                        ) : (
                          <div className="">{review.comment}</div>
                        )}
                        <div>
                          {onEdit ? (
                            <i
                              className="fa-solid fa-backward"
                              onClick={() => setOnEdit(false)}
                            ></i>
                          ) : (
                            <i
                              className="fa-solid fa-trash-can "
                              onClick={deleteReviewProduct}
                            ></i>
                          )}
                          &nbsp;&nbsp;&nbsp;
                          {onEdit ? (
                            <i
                              className="fa-solid fa-check"
                              onClick={updateReviewProduct}
                            ></i>
                          ) : (
                            <i
                              className="fa-solid fa-pen-to-square"
                              onClick={() => setOnEdit(true)}
                            ></i>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="">{review.comment}</div>
                    )}
                  </div>
                </div>
              </Fragment>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Comments;
