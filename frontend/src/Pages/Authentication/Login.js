import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Header, Loading, MetaData } from "../../imports/index";
import { LoginInitial } from "../../Redux/AuthenticationSlice";
import Message from "../Error/Message";
import { toast } from "react-toastify";
const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState(initialState);
  const { email, password } = state;
  const { loading, auth } = useSelector((state) => ({ ...state.data }));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please Enter Input 🥲");
    }
    dispatch(LoginInitial({ email, password }));
  };
  useEffect(() => {
    if (auth.status === 200) {
      window.location.href = "/";
      localStorage.setItem("firstLogin", true);
    }
  }, [auth]);
  window.scrollTo(0, 0);
  return (
    <>
      <MetaData title="Login-ShoeShop" />
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {auth.status === 400 && (
          <Message variant="alert-danger">{auth.msg}</Message>
        )}

        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            name="email"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            name="password"
            onChange={handleChange}
          />
          {loading ? <Loading /> : <button type="submit">Login</button>}
          <p>
            <Link to="/register">Create Account </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/Forget">Forget ?</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
