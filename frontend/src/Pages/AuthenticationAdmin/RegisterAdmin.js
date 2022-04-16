import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HeaderLoginAdmin, Loading, MetaData } from "../../imports/index";
import {
  RegisterAdminInitial,
  reset,
} from "../../Redux/AuthenticationAdminSlice";
import Message from "../Error/Message";
const initialState = {
  name: "",
  email: "",
  password: "",
};
const RegisterAdmin = () => {
  window.scrollTo(0, 0);
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, registerAdmin } = useSelector((state) => ({
    ...state.admin,
  }));
  const { name, email, password } = state;
  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return toast.error("Please Enter Input 🥲");
    }
    dispatch(RegisterAdminInitial({ name, email, password }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  useEffect(() => {
    if (registerAdmin.status === 200) {
      navigate("/loginAdmin");
      toast.success(registerAdmin.msg);
      dispatch(reset());
    }
    if (registerAdmin.status === 400) {
      setTimeout(() => {
        dispatch(reset());
      }, [3000]);
    }
  }, [registerAdmin]);
  return (
    <>
      <MetaData title="Register-Admin-ShoeShop" />
      <HeaderLoginAdmin />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {registerAdmin.status === 400 && (
          <Message variant="alert-danger">{registerAdmin.msg}</Message>
        )}
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <input
            type="type"
            placeholder="Full Name"
            value={name}
            name="name"
            onChange={handleChange}
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
          {loading ? <Loading /> : <button type="submit">Register</button>}
          <p>
            <Link to="/loginAdmin">Back Login</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default RegisterAdmin;
