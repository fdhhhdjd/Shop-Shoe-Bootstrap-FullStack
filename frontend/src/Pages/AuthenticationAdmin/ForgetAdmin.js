import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Loading, MetaData, HeaderLoginAdmin } from "../../imports/index";
import Message from "../Error/Message";
import swal from "sweetalert";
import {
  ForgetAdminInitiate,
  reset,
} from "../../Redux/AuthenticationAdminSlice";
const initialState = {
  email: "",
};
const ForgetAdmin = () => {
  window.scrollTo(0, 0);
  const [state, setState] = useState(initialState);
  const [password, setPassword] = useState("");
  const error = true;
  const dispatch = useDispatch();
  const { email } = state;
  const { loading, forgetAdmin } = useSelector((state) => ({ ...state.admin }));
  const submitHandler = (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Please Enter A Valid Email 🥲");
    }
    dispatch(ForgetAdminInitiate({ email }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  useEffect(() => {
    if (forgetAdmin.status === 200) {
      swal(`${forgetAdmin.msg}`, {
        icon: "success",
      });
      setState({ email: "" });
      dispatch(reset());
    }
  }, [forgetAdmin]);
  return (
    <>
      <MetaData title="Forget-ShoeShop" />
      <HeaderLoginAdmin />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {forgetAdmin && forgetAdmin.status === 400 && (
          <Message variant="alert-danger">{forgetAdmin.msg}</Message>
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
            <Link to="/loginAdmin">Back Login ?</Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default ForgetAdmin;
