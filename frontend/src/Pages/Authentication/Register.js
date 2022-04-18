import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Header, Loading, Message, MetaData } from "../../imports/index";
import { RegisterInitiate, reset } from "../../Redux/AuthenticationSlice";
const initialState = {
  name: "",
  phone_number: "",
  date_of_birth: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Register = () => {
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, authRegister } = useSelector((state) => ({ ...state.data }));
  const {
    name,
    email,
    password,
    confirmPassword,
    date_of_birth,
    phone_number,
  } = state;
  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      return toast.error("Please Enter Input 🥲");
    }
    dispatch(
      RegisterInitiate({
        name,
        phone_number,
        date_of_birth,
        email,
        password,
        confirmPassword,
      })
    );
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  useEffect(() => {
    if (authRegister.status === 200) {
      navigate("/login");
      toast.success(authRegister.msg);
      dispatch(reset());
    }
    if (authRegister.status === 400) {
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }
  }, [authRegister, dispatch, navigate]);
  return (
    <>
      <MetaData title="Register-ShoeShop" />
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {authRegister.status === 400 && (
          <Message variant="alert-danger">{authRegister.msg}</Message>
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
            type="phone"
            placeholder="Phone"
            value={phone_number}
            name="phone_number"
            onChange={handleChange}
          />
          <input
            type="date"
            placeholder="Date"
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
            placeholder="confirmPassword"
            value={confirmPassword}
            name="confirmPassword"
            onChange={handleChange}
          />
          {loading ? <Loading /> : <button type="submit">Register</button>}
          <p>
            <Link to="/login">Back Login</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
