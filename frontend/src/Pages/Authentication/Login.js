import { useContext, useEffect, useRef, useState } from "react";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import ReCAPTCHA from "react-google-recaptcha";
import toastHot from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { GlobalState } from "../../Context/GlobalState";
import {
  Header,
  Loading,
  Message,
  MetaData,
  SwaleMessage,
  useDeleteCache,
} from "../../imports/index";
import {
  LoginFacebookInitiate,
  LoginGoogleInitiate,
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
  const { CacheRedis } = useDeleteCache();
  const [count, setCount] = useState();
  const reCaptcha = useRef();

  const grecaptchaObject = window.grecaptcha;

  const { email, password } = state;
  const { loading, auth } = useSelector((state) => ({ ...state.data }));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const HandleRemember = () => {
    setRememberMe(!rememberer);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please Enter Input 🥲 !");
    }
    const token = await reCaptcha.current.executeAsync();
    dispatch(LoginInitial({ email, password, toast, rememberer, token })).then(
      (item) => {
        if (item.payload.status === 200) {
          toastHot.loading("Redirecting...");
        }
      }
    );
  };
  const HandleGoogle = (response) => {
    if (response.error) {
      return toast.error(response.error);
    } else {
      dispatch(LoginGoogleInitiate(response)).then((item) => {
        if (item.payload.status === 200) {
          if (item.payload.msg == "Register successfully") {
            CacheRedis({ key: "users" });
          }
          toastHot.loading("Redirecting...");
        }
      });
    }
  };
  const responseFacebook = (response) => {
    if (response.accessToken) {
      dispatch(LoginFacebookInitiate(response)).then((item) => {
        if (item.payload.status === 200) {
          if (item.payload.msg == "Register successfully") {
            CacheRedis({ key: "users" });
          }
          toastHot.loading("Redirecting...");
        }
      });
    } else {
      return toast.error(response.error);
    }
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
      window.scrollTo(0, 0);
      setTimeout(() => {
        dispatch(reset());
        reCaptcha.current.reset();
      }, 3000);
    } else if (auth.status === 503) {
      setCount(auth?._ttl);
    }
  }, [auth]);
  useEffect(() => {
    if (count) {
      const interval = setInterval(() => {
        setCount((currentCount) => --currentCount);
      }, 1000);
      return () => clearInterval(interval);
    } else if (count === 0) {
      toastNotification();
      dispatch(reset());
      setCount(0);
    }
  }, [count !== 0 && count != undefined]);
  const toastNotification = () => {
    if (count === 0) {
      swal(`${`Unlocked Login Account 😊`}`, {
        icon: "warning",
        closeOnClickOutside: true,
        buttons: ["No", "Yes"], //with custom label
        dangerMode: false,
      });
    } else {
      swal(`${`You Block ${count}s,Thank You 🙃`}`, {
        icon: "warning",
        closeOnClickOutside: false,
        buttons: ["No"], //with custom label
        dangerMode: true,
      });
    }
  };
  return (
    <>
      {count != 0 && count != undefined ? (
        toastNotification()
      ) : (
        <>
          {auth.status === 200 ? (
            <MetaData title="Redirect Home..." />
          ) : (
            <MetaData title="Login-ShoeShop" />
          )}
          <Header />
          <div className="container d-flex flex-column justify-content-center align-items-center login-center">
            {auth.status === 400 && (
              <Message variant="alert-danger">{auth.msg}</Message>
            )}
            <div className="Login col-md-8 col-lg-4 col-11">
              <GoogleLogin
                clientId={process.env.REACT_APP_KEY_GOOGLE}
                buttonText="Login Google +"
                onSuccess={HandleGoogle}
                onFailure={HandleGoogle}
                cookiePolicy={"single_host_origin"}
              />
              <FacebookLogin
                appId={process.env.REACT_APP_KEY_FACEBOOK}
                // appId={process.env.REACT_APP_KEY_FACEBOOK_TEST}
                autoLoad={false}
                callback={responseFacebook}
                icon="fa-facebook"
                cssClass="btnFacebook"
                textButton="&nbsp;&nbsp;Sign In with Facebook"
              />
              <button onClick={() => navigate("/loginphone")}>
                Sign In Phone Number
              </button>
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
                size="invisible"
                ref={reCaptcha}
                sitekey={process.env.REACT_APP_KEY_RECAPTCHA_V3}
                theme="light"
                badge="bottomleft"
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
      )}
    </>
  );
};

export default Login;
