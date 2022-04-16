import React, { useEffect, useState, useContext, useRef } from "react";
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReCAPTCHA from "react-google-recaptcha";
import {
  HeaderLoginAdmin,
  Loading,
  MetaData,
  Message,
  SwaleMessage,
} from "../../imports/index";
import {
  LoginAdminInitial,
  LoginGooglAdminInitiate,
  reset,
} from "../../Redux/AuthenticationAdminSlice";
import { GlobalState } from "../../Context/GlobalState";
const initialState = {
  email: "",
  password: "",
};
const LoginAdmin = () => {
  const DataRemember = localStorage.getItem("rememberAdmin");
  const foundUser = JSON.parse(DataRemember);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const grecaptchaObject = window.grecaptcha;
  const states = useContext(GlobalState);
  const [remembererAdmin, setRememberMeAdmin] = states.rememberAdmin;
  const reCaptcha = useRef();
  const [state, setState] = useState(initialState);
  const { email, password } = state;
  const { loading, admin } = useSelector((state) => ({ ...state.admin }));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please Enter Input 🥲");
    }
    if (!token) {
      SwaleMessage("Mời bạn xác thực đầy đủ !", "error");
      return;
    }
    dispatch(LoginAdminInitial({ email, password, toast, remembererAdmin }));
  };
  const HandleRememberAdmin = () => {
    setRememberMeAdmin(!remembererAdmin);
  };
  const HandleGoogle = (response) => {
    if (response.error) {
      return toast.error(response.error);
    } else {
      dispatch(LoginGooglAdminInitiate(response));
    }
  };
  useEffect(() => {
    if (foundUser) {
      setState(foundUser);
    }
  }, []);
  useEffect(() => {
    if (admin && admin.status === 200) {
      if (location.state?.from) {
        navigate(location.state.from);
        window.location.reload();
      } else {
        window.location.href = "/homeAdmin";
      }
      localStorage.setItem("firstLoginAdmin", true);
    }
    if (admin && admin.status === 400) {
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }
  }, [admin]);

  window.scrollTo(0, 0);
  return (
    <>
      {admin.status === 200 ? (
        <MetaData title="Redirect Dashboard..." />
      ) : (
        <MetaData title="Login-Admin-ShopShoe" />
      )}
      <HeaderLoginAdmin />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {admin && admin.status === 400 && (
          <Message variant="alert-danger">{admin.msg}</Message>
        )}
        <div className="Login col-md-8 col-lg-4 col-11">
          <GoogleLogin
            clientId={process.env.REACT_APP_KEY_GOOGLE}
            buttonText="Login Admin Google +"
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
              onChange={HandleRememberAdmin}
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
            sitekey={process.env.REACT_APP_KEY_RECAPTCHA}
            onChange={(token) => setToken(token)}
            onExpired={(e) => setToken("")}
            size="normal"
            theme="light"
            grecaptcha={grecaptchaObject}
          />
          {loading ? <Loading /> : <button type="submit">Login</button>}
          <p>
            <Link to="/registerAdmin">Create Account </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/ForgetAdmin">Forget ?</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginAdmin;
