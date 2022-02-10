import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../Pages/Error/Message";
import swal from "sweetalert";
import { Loading, MetaData } from "../../imports/index";
import { ChangePasswordInitiate, reset } from "../../Redux/AuthenticationSlice";
const initialState = {
  oldPassword: "",
  password: "",
  confirmPassword: "",
};

const ChangePassword = () => {
  const [state, setState] = useState(initialState);
  const { loading, changePass, refreshToken } = useSelector((state) => ({
    ...state.data,
  }));
  const { oldPassword, password, confirmPassword } = state;
  const token = refreshToken.accessToken;
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(ChangePasswordInitiate({ token, ...state }));
  };
  useEffect(() => {
    if (changePass.status === 200) {
      swal(`${changePass.msg}`, {
        icon: "success",
      });
      dispatch(reset());
    } else if (changePass.status === 400) {
      setTimeout(() => {
        dispatch(reset());
      }, 3000);
    }
  }, [changePass]);
  return (
    <>
      {changePass.status === 400 && (
        <Message variant="alert-danger">{changePass.msg}</Message>
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

export default ChangePassword;
