import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Loading, MetaData, HeaderLoginAdmin } from "../../imports/index";
import {
  LoginAdminInitial,
  LoginGooglAdminInitiate,
  reset,
} from "../../Redux/AuthenticationAdminSlice";
import Message from "../Error/Message";
import GoogleLogin from "react-google-login";
import { toast } from "react-toastify";
const initialState = {
  email: "",
  password: "",
};
const LoginAdmin = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);
  const { email, password } = state;
  const { loading, admin } = useSelector((state) => ({ ...state.admin }));
  const { profile } = useSelector((state) => ({ ...state.data }));
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please Enter Input 🥲");
    }
    dispatch(LoginAdminInitial({ email, password }));
  };
  const HandleGoogle = (response) => {
    dispatch(LoginGooglAdminInitiate(response));
  };
  useEffect(() => {
    if (admin.status === 200) {
      if (location.state?.from) {
        navigate(location.state.from);
        window.location.reload();
      } else {
        window.location.href = "/homeAdmin";
      }
      localStorage.setItem("firstLoginAdmin", true);
    }
    if (admin.status === 400) {
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }
  }, [admin]);

  window.scrollTo(0, 0);
  return (
    <>
      <MetaData title="ShoeShop-Dev" />
      <HeaderLoginAdmin />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {admin.status === 400 && (
          <Message variant="alert-danger">{admin.msg}</Message>
        )}

        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <GoogleLogin
            clientId="1083950083676-fr9m6jsgig4aalf6mj81t8rlgl9v45bd.apps.googleusercontent.com"
            buttonText="Login Admin Google +"
            onSuccess={HandleGoogle}
            onFailure={HandleGoogle}
            cookiePolicy={"single_host_origin"}
          />
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
