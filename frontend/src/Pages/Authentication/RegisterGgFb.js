import React, { useEffect, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Header,
  Loading,
  Message,
  MetaData,
  SwaleMessage,
} from "../../imports/index";
import {
  ChangePasswordLoginGgFbInitiate,
  reset,
} from "../../Redux/AuthenticationSlice";

const initialState = {
  password: "",
  confirmPassword: "",
  phone_number: "",
  date_of_birth: "",
};
const RegisterGgFb = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const { refreshToken, loading, profile, CheckCreate } = useSelector(
    (state) => ({
      ...state.data,
    })
  );
  const tokens = refreshToken.accessToken;
  const [token, setToken] = useState("");
  const reCaptcha = useRef();
  const grecaptchaObject = window.grecaptcha;
  const { password, confirmPassword, phone_number, date_of_birth } = state;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!confirmPassword || !password || !phone_number || !date_of_birth) {
      return toast.error("Please Enter Input 🥲 !");
    }
    if (!token) {
      SwaleMessage("Mời bạn xác thực đầy đủ !", "error");
      return;
    }
    dispatch(ChangePasswordLoginGgFbInitiate({ tokens, ...state }));
  };
  useEffect(() => {
    if (profile?.user?.checkLogin === true) {
      window.location.href = "/";
    }
    if (CheckCreate.status === 200) {
      if (location.state?.from) {
        navigate(location.state.from);
        window.location.reload();
      } else {
        window.location.href = "/";
      }
    }

    if (CheckCreate.status === 400) {
      window.scrollTo(0, 0);
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }
  }, [CheckCreate, profile?.user]);

  return (
    <>
      {CheckCreate.status === 200 ? (
        <MetaData title="Redirect Home..." />
      ) : (
        <MetaData title="Signing Google or Facebook" />
      )}
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {CheckCreate.status === 400 && (
          <Message variant="alert-danger">{CheckCreate.msg}</Message>
        )}
        <div className="Login col-md-8 col-lg-4 col-11">
          <h3>Please Your Info</h3>
        </div>

        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <input
            type="type"
            placeholder="Phone Number"
            value={phone_number}
            name="phone_number"
            onChange={handleChange}
          />
          <input
            type="date"
            placeholder="Phone Number"
            value={date_of_birth}
            name="date_of_birth"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            name="password"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
          />
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
          {loading ? (
            <Loading />
          ) : (
            <button type="submit">Create Account</button>
          )}
        </form>
      </div>
    </>
  );
};

export default RegisterGgFb;
