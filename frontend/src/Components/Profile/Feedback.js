import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading, Message, SwaleMessage } from "../../imports/index";
import { reset, SendFeedbacksInitial } from "../../Redux/FeedbackSlice";
import { toast } from "react-toastify";
const initialState = {
  fullname: "",
  email: "",
  content: "",
  subject: "",
};

const Feedback = () => {
  const [state, setState] = useState(initialState);
  const { refreshToken, profile } = useSelector((state) => ({
    ...state.data,
  }));
  const { sendFeedback, loading } = useSelector((state) => ({
    ...state.feedbacks,
  }));
  const { fullname, email, content, subject } = state;
  const user = profile && profile.user;
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!fullname || !email || !subject || !content) {
      return toast.error("Please Enter Input 🥲");
    }
    dispatch(SendFeedbacksInitial({ fullname, email, content, subject }));
  };
  useEffect(() => {
    if (sendFeedback.status === 200) {
      SwaleMessage(`${sendFeedback.msg}`, "success");
      setTimeout(() => {
        dispatch(reset());
      }, 2000);
      setState({ content: "", subject: "" });
    } else if (sendFeedback.status === 400) {
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }
  }, [sendFeedback]);
  useEffect(() => {
    if (user) {
      setState({
        fullname: user.name,
        email: user.email,
      });
    }
  }, [user, sendFeedback]);
  return (
    <>
      {sendFeedback.status === 400 && (
        <Message variant="alert-danger">{sendFeedback.msg}</Message>
      )}
      <form className="row  form-container" onSubmit={submitHandler}>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-fn">Full Name</label>
            <input
              className="form-control"
              type="type"
              required
              value={fullname}
              name="fullname"
              onChange={handleChange}
              disabled={true}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-pass">Email</label>
            <input
              className="form-control"
              type="type"
              value={email}
              name="email"
              onChange={handleChange}
              disabled={true}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-confirm-pass">Subject</label>
            <input
              className="form-control"
              type="type"
              value={subject || ""}
              name="subject"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label htmlFor="account-confirm-pass">Content</label>
            <textarea
              className="form-control"
              cols="10"
              rows="5"
              value={content || ""}
              name="content"
              onChange={handleChange}
            ></textarea>
          </div>
        </div>
        {loading ? <Loading /> : <button type="submit">Send Feedback</button>}
      </form>
    </>
  );
};

export default Feedback;
