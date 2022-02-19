import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { Header, Loading, MetaData } from "../../imports/index";
import {
  ResetAdminInitiate,
  reset,
} from "../../Redux/AuthenticationAdminSlice";
import Message from "../Error/Message";
const initialState = {
  password: "",
  confirmPassword: "",
};
const ResetAdmin = () => {
  window.scrollTo(0, 0);
  const [state, setState] = useState(initialState);
  const { loading, resetAdmin } = useSelector((state) => ({
    ...state.admin,
  }));
  const { token } = useParams();
  const dispatch = useDispatch();
  const { password, confirmPassword } = state;
  const submitHandler = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      return toast.error("Please Enter Input 😇");
    }
    dispatch(ResetAdminInitiate({ token, password, confirmPassword }));
  };
  useEffect(() => {
    if (resetAdmin.status === 200) {
      swal(`${resetAdmin.msg}`, {
        icon: "success",
      });
      setState({ password: "", confirmPassword: "" });
      setTimeout(() => {
        window.location.href = "/loginAdmin";
      }, 1500);
      dispatch(reset());
    }
    if (resetAdmin.status === 400) {
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }
  }, [resetAdmin]);
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <>
      <MetaData title="Reset-ShoeShop" />
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {resetAdmin && resetAdmin.status === 400 && (
          <Message variant="alert-danger">{resetAdmin.msg}</Message>
        )}
        {resetAdmin && resetAdmin.success ? (
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

export default ResetAdmin;
