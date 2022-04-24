import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import swal from "sweetalert";
import {
  HeaderLoginAdmin,
  Loading,
  Message,
  MetaData,
} from "../../imports/index";
import {
  ForgetAdminInitiate,
  reset,
} from "../../Redux/AuthenticationAdminSlice";
const initialState = {
  email: "",
};
const ForgetAdmin = () => {
  const [state, setState] = useState(initialState);

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
  }, [forgetAdmin, dispatch]);
  return (
    <>
      <MetaData title="Forget-Admin-ShoeShop" />
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
