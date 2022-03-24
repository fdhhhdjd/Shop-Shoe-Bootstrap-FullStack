import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { GlobalState } from "../../Context/GlobalState";
import { Loading } from "../../imports";
import { ReplyFeedbacksInitial, reset } from "../../Redux/FeedbackSlice";
const initialState = {
  response_content: "",
};
const ReplyUserMain = () => {
  const [states, setState] = useState(initialState);
  const { response_content } = states;
  const dispatch = useDispatch();
  const { refreshTokenAdmin } = useSelector((state) => ({
    ...state.admin,
  }));
  const { replyFeedback, loading } = useSelector((state) => ({
    ...state.feedbacks,
  }));
  console.log(replyFeedback);
  const token = refreshTokenAdmin.accessToken && refreshTokenAdmin.accessToken;
  const { id } = useParams();
  const state = useContext(GlobalState);
  const [callbackAdmin, setCallbackAdmin] = state.callbackAdmin;
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...states, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(ReplyFeedbacksInitial({ token, id, response_content }));
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  useEffect(() => {
    if (replyFeedback.status === 200) {
      setCallbackAdmin(!callbackAdmin);
      navigate("/feedback");
      swal(replyFeedback.msg, {
        icon: "success",
      });
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    } else if (replyFeedback.status === 400) {
      swal(replyFeedback.msg, {
        icon: "error",
      });
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }
  }, [replyFeedback]);
  return (
    <>
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={handleSubmit}>
          <div className="content-header">
            <Link to="/feedback" className="btn btn-danger text-white">
              Go to Feedback
            </Link>
            <h2 className="content-title">Reply</h2>
            <div>
              {loading ? (
                <Loading />
              ) : (
                <button type="submit" className="btn btn-primary">
                  Reply
                </button>
              )}
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Response Content
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={response_content}
                      name="response_content"
                      onChange={handleChange}
                      required={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default ReplyUserMain;
