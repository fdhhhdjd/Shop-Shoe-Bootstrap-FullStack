import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../Pages/Error/Message";
const initialState = {
  name: "",
};
const ProfileTabs = () => {
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
  };
  const { name } = state;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <>
      {<Message variant="alert-danger">12312321</Message>}
      <form className="row  form-container" onSubmit={submitHandler}>
        <div className="col-md-6">
          <div className="form">
            <label for="account-fn">UserName</label>
            <input
              className="form-control"
              type="text"
              required
              value={name}
              name="name"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label for="account-email">E-mail Address</label>
            <input
              className="form-control"
              type="email"
              required
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
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </>
  );
};

export default ProfileTabs;
