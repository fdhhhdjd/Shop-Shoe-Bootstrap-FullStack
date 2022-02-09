import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../Pages/Error/Message";
import { ChangePasswordInitiate } from "../../Redux/AuthenticationSlice";
const initialState = {
  oldPassword: "",
  password: "",
  confirmPassword: "",
};
const ChangePassword = () => {
  const [state, setState] = useState(initialState);
  const { loading, changePassword, refreshToken } = useSelector((state) => ({
    ...state.data,
  }));
  const token = refreshToken.accessToken;
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(ChangePasswordInitiate({ token }, { ...state }));
  };
  const { oldPassword, password, confirmPassword } = state;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <>
      {changePassword.status === 400 && (
        <Message variant="alert-danger">{changePassword.msg}</Message>
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
        <button type="submit">Update Password</button>
      </form>
    </>
  );
};

export default ChangePassword;
