import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Header, Loading, MetaData, Message } from "../../imports/index";
import {
  LoginGoogleInitiate,
  LoginInitial,
  reset,
} from "../../Redux/AuthenticationSlice";

const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
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
      return toast.error("Please Enter Input 🥲 !");
    }
    dispatch(LoginInitial({ email, password, toast }));
  };
  const HandleGoogle = (response) => {
    dispatch(LoginGoogleInitiate(response));
  };
  useEffect(() => {
    if (auth.status === 200) {
      if (location.state?.from) {
        navigate(location.state.from);
        window.location.reload();
      } else {
        window.location.href = "/";
      }
      localStorage.setItem("firstLogin", true);
    }
    if (auth.status === 400) {
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
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
        <div className="Login col-md-8 col-lg-4 col-11">
          <GoogleLogin
            clientId="1083950083676-fr9m6jsgig4aalf6mj81t8rlgl9v45bd.apps.googleusercontent.com"
            buttonText="Login Google +"
            onSuccess={HandleGoogle}
            onFailure={HandleGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </div>

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
