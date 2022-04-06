import React, { useEffect, useRef, useState } from "react";
import GoogleLogin from "react-google-login";
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
  const [token, setToken] = useState("");
  const reCaptcha = useRef();
  const { email, password } = state;
  const grecaptchaObject = window.grecaptcha;

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
    if (!token) {
      SwaleMessage("Mời bạn xác thực đầy đủ !", "error");
      return;
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
