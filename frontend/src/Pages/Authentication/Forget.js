import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Header,
  Loading,
  Message,
  MetaData,
  SwaleMessage,
} from "../../imports/index";
import { ForgetInitiate, reset } from "../../Redux/AuthenticationSlice";

const initialState = {
  email: "",
};
const Forget = () => {
  window.scrollTo(0, 0);
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();
  const { email } = state;
  const { loading, forget } = useSelector((state) => ({ ...state.data }));
  const submitHandler = (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please Enter A Valid Email 🥲");
    }
    dispatch(ForgetInitiate({ email }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  useEffect(() => {
    if (forget.status === 200) {
      SwaleMessage(`${forget.msg}`, "success");
      setState({ email: "" });
      dispatch(reset());
    }
    if (forget.status === 400) {
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }
  }, [forget]);

  return (
    <>
      <MetaData title="Forget-ShoeShop" />
      <Header />

      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {forget && forget.status === 400 && (
          <Message variant="alert-danger">{forget.msg}</Message>
        )}
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
          {loading ? <Loading /> : <button type="submit">Forget</button>}
          <p>
            <Link to="/login">Back Login ?</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Forget;
