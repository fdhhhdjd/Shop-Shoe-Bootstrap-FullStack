import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { SwaleMessage } from "../../imports";
import { Rating } from "../../imports/index";
import {
  DeleteProductDetailInitial,
  updateReviewProductDetailInitial,
} from "../../Redux/ProductSlice";
import { DeleteCacheRedisInitial } from "../../Redux/RedisSlice";
const initialState = {
  comment: "",
};
const Comments = ({
  replies,
  user,
  productId,
  token,
  id,
  setOnEdit,
  onEdit,
  setRunProduct,
  runProduct,
  flagComment,
  setFlagComment,
}) => {
  const dispatch = useDispatch();
  const [commentReview, setCommentReview] = useState(initialState);
  const [commentId, setCommentId] = useState();
  const [Review, setReview] = useState();
  const { comment } = commentReview;
  const messageEndRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentReview({ ...commentReview, [name]: value });
  };
  useEffect(() => {
    setFlagComment(false);
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
        dispatch(
          DeleteProductDetailInitial({ productId, token, commentId })
        ).then((item) => {
          dispatch(DeleteCacheRedisInitial({ key: "products" })).then(
            (items) => {
              setRunProduct(!runProduct);
              setFlagComment(true);
              SwaleMessage("Delete Comments successfully 😉 !", "success");
            }
          );
        });
      } else {
        SwaleMessage("Thank you for 😆 !");
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
    )
      .then((item) => {
        dispatch(DeleteCacheRedisInitial({ key: "products" })).then((items) => {
          setOnEdit(false);
          setFlagComment(true);
          setRunProduct(!runProduct);
        });
      })
      .catch(() => {
        console.log("Failed to Edit");
      });
  };
  const ScrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    if (flagComment === true) {
      setTimeout(() => {
        ScrollToBottom();
      }, 500);
    }
  }, [flagComment]);
  return (
    <React.Fragment>
      {replies.length > 0 && (
        <div className="replies" ref={messageEndRef}>
          {replies.map((review, index) => {
            return (
              <React.Fragment key={index}>
                <div className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded">
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
              </React.Fragment>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
};

export default Comments;
