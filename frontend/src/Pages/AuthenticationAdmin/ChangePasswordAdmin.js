import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../Pages/Error/Message";
import swal from "sweetalert";
import { Loading } from "../../imports/index";
import {
  ChangePasswordAdminInitiate,
  reset,
} from "../../Redux/AuthenticationAdminSlice";
const initialState = {
  oldPassword: "",
  password: "",
  confirmPassword: "",
};

const ChangePasswordAdmin = () => {
  const [state, setState] = useState(initialState);
  const { loading, changePasswordAdmin, refreshTokenAdmin } = useSelector(
    (state) => ({
      ...state.admin,
    })
  );
  const { oldPassword, password, confirmPassword } = state;
  const token = refreshTokenAdmin.accessToken;
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(ChangePasswordAdminInitiate({ token, ...state }));
  };
  useEffect(() => {
    if (changePasswordAdmin.status === 200) {
      swal(`${changePasswordAdmin.msg}`, {
        icon: "success",
      });
      dispatch(reset());
      setState({ oldPassword: "", password: "", confirmPassword: "" });
    } else if (changePasswordAdmin.status === 400) {
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }
  }, [changePasswordAdmin]);
  return (
    <>
      {changePasswordAdmin.status === 400 && (
        <Message variant="alert-danger">{changePasswordAdmin.msg}</Message>
      )}
      <form className="row  form-container" onSubmit={submitHandler}>
        <div className="col-md-6">
          <div className="form">
            <label for="account-fn">Old Password</label>
            <input
              className="form-control"
              type="password"
              required
              value={oldPassword}
              name="oldPassword"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-pass">New Password</label>
            <input
              className="form-control"
              type="password"
              value={password}
              name="password"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-confirm-pass">Confirm Password</label>
            <input
              className="form-control"
              type="password"
              value={confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
            />
          </div>
        </div>
        {loading ? <Loading /> : <button type="submit">Update Password</button>}
      </form>
    </>
  );
};

export default ChangePasswordAdmin;
