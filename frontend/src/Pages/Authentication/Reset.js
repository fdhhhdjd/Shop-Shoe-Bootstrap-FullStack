import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Header,
  Loading,
  Message,
  MetaData,
  SwaleMessage,
} from "../../imports/index";
import { reset, ResetInitiate } from "../../Redux/AuthenticationSlice";
const initialState = {
  password: "",
  confirmPassword: "",
};
const Reset = () => {
  window.scrollTo(0, 0);
  const [state, setState] = useState(initialState);
  const { loading, resetForget } = useSelector((state) => ({
    ...state.data,
  }));
  const { token } = useParams();
  const dispatch = useDispatch();
  const { password, confirmPassword } = state;
  const submitHandler = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      return toast.error("Please Enter Input 🥲");
    }
    dispatch(ResetInitiate({ token, password, confirmPassword }));
  };
  useEffect(() => {
    if (resetForget.status === 200) {
      SwaleMessage(`${resetForget.msg}`, "success");
      setState({ password: "", confirmPassword: "" });
      setTimeout(() => {
        window.close();
      }, 1500);
      dispatch(reset());
    }
    if (resetForget.status === 400) {
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }
  }, [resetForget]);
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <>
      <MetaData title="Reset-ShoeShop" />
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {resetForget && resetForget.status === 400 && (
          <Message variant="alert-danger">{resetForget.msg}</Message>
        )}
        {resetForget && resetForget.success ? (
          <div className="Login col-md-8 col-lg-4 col-11">
            {loading ? (
              <Loading />
            ) : (
              <button type="submit">Success Please login 😊</button>
            )}
            <p>Thank You for 😉 !</p>
          </div>
        ) : (
          <form
            className="Login col-md-8 col-lg-4 col-11"
            onSubmit={submitHandler}
          >
            <input
              type="password"
              placeholder="Password"
              value={password}
              name="password"
              onChange={handleChangeInput}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              name="confirmPassword"
              onChange={handleChangeInput}
            />
            {loading ? <Loading /> : <button type="submit">Reset</button>}
            <p>
              <Link to="/login">Back Login ?</Link>
            </p>
          </form>
        )}
      </div>
    </>
  );
};

export default Reset;
