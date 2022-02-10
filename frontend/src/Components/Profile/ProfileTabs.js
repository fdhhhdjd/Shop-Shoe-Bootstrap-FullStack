import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../../Pages/Error/Message";
const initialState = {
  name: "",
  phone_number: "",
  sex: "",
  date_of_birth: "",
};
const ProfileTabs = () => {
  const [state, setState] = useState(initialState);
  const dispatch = useDispatch();
  const [images, setImages] = useState(false);
  const { loading, profile } = useSelector((state) => ({ ...state.data }));
  const submitHandler = (e) => {
    e.preventDefault();
  };
  const { name } = state;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  useEffect(() => {
    if (profile) {
      setState({ ...profile.user });
      if (profile.url === "") {
        setImages(profile.image.url);
      } else {
        setImages(profile.image);
      }
    }
  }, [profile]);

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
              value={state.name}
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
              value={state.email}
              name="email"
              disabled
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-pass">Phone Number</label>
            <input
              className="form-control"
              type="text"
              value={state.phone_number}
              name="phone_number"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label htmlFor="gioitinh">Gender</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              value="1"
              id="sex"
              name="sex"
              checked={state.sex == 1}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Nam
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              value="0"
              id="sex"
              name="sex"
              checked={state.sex == 0}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Nữ
            </label>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form">
            <label for="account-pass">Phone Number</label>
            <input
              className="form-control"
              type="date"
              data-date=""
              data-date-format="DD MMMM YYYY"
              name="date_of_birth"
              id="date_of_birth"
              value={state.date_of_birth}
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
