import React, { useContext, useEffect, useRef, useState } from "react";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  Header,
  Loading,
  Message,
  MetaData,
  SwaleMessage,
} from "../../imports/index";
import { GlobalState } from "../../Context/GlobalState";
import {
  LoginGoogleInitiate,
  LoginFacebookInitiate,
  LoginInitial,
  reset,
} from "../../Redux/AuthenticationSlice";
const initialState = {
  email: "",
  password: "",
};
const Login = () => {
  const DataRemember = localStorage.getItem("remember");
  const foundUser = JSON.parse(DataRemember);
  const states = useContext(GlobalState);
  const [rememberer, setRememberMe] = states.remember;
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const [token, setToken] = useState("");
  const reCaptcha = useRef();
  const { email, password } = state;
  const grecaptchaObject = window.grecaptcha;
  const { loading, auth } = useSelector((state) => ({ ...state.data }));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const HandleRemember = () => {
    setRememberMe(!rememberer);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please Enter Input 🥲 !");
    }
    if (!token) {
      SwaleMessage("Mời bạn xác thực đầy đủ !", "error");
      return;
    }
    dispatch(LoginInitial({ email, password, toast, rememberer }));
  };
  const HandleGoogle = (response) => {
    if (response.error) {
      return toast.error(response.error);
    } else {
      dispatch(LoginGoogleInitiate(response));
    }
  };
  const responseFacebook = (response) => {
    console.log(response);
    dispatch(LoginFacebookInitiate(response));
  };
  useEffect(() => {
    if (foundUser) {
      setState(foundUser);
    }
  }, []);
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
          <FacebookLogin
            // appId="2732900180350170"
            appId="1361366160990874"
            autoLoad={false}
            callback={responseFacebook}
            icon="fa-facebook"
            cssClass="btnFacebook"
            textButton="&nbsp;&nbsp;Sign In with Facebook"
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
          <br />
          <br />
          <div className="custom-control custom-checkbox">
            <input
              className="custom-control-input"
              type="checkbox"
              style={{
                marginTop: "0",
                padding: "0,0",
                width: "25px",
                float: "left",
              }}
              onChange={HandleRemember}
            />
            <label
              style={{ float: "left", marginTop: "-5px" }}
              className="custom-control-label "
              htmlFor="flexCheckDefault"
            >
              Remember ?
            </label>
          </div>
          <br />
          <br />
          <ReCAPTCHA
            ref={reCaptcha}
            sitekey="6LdHT3wcAAAAAJfSOX-t5x0EX_l6MVQ1zFjHH9es"
            onChange={(token) => setToken(token)}
            onExpired={(e) => setToken("")}
            size="normal"
            theme="light"
            grecaptcha={grecaptchaObject}
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
