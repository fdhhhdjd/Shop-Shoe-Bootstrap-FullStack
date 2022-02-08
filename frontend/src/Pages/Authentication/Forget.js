import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Header, Loading, MetaData } from "../../imports/index";
import Message from "../Error/Message";
const Login = () => {
  window.scrollTo(0, 0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const error = true;
  const submitHandler = () => {};
  return (
    <>
      <MetaData title="Forget-ShoeShop" />
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger">hello</Message>}
        {/* {loading && <Loading />} */}
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Forget</button>
          <p>
            <Link to="/login">Back Login ?</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
