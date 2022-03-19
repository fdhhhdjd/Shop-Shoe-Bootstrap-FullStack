import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../../Context/GlobalState";
import { Loading, SwaleMessage, useUpDesImg } from "../../imports/index";
const initialState = {
  name: "",
  phone_number: "",
  sex: "",
  date_of_birth: "",
};
const ProfileTabs = () => {
  const [states, setState] = useState(initialState);
  const dispatch = useDispatch();

  const state = useContext(GlobalState);
  const [callback, setCallback] = state.callback;
  const { profile, refreshToken } = useSelector((state) => ({
    ...state.data,
  }));

  const token = refreshToken.accessToken;
  const { loading, handleUpload, handleDestroy, images, setImages } =
    useUpDesImg(token);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!images) return SwaleMessage("No Image Upload 😅 !", "error");
    try {
      await axios.patch(
        `/api/auth/profile/update`,
        { ...states, image: images },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      SwaleMessage("Edit profile Successfully", "success");
      setCallback(!callback);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...states, [name]: value });
  };
  useEffect(() => {
    if (profile.user) {
      setState({ ...profile.user });
      if (profile.user.image.url === "") {
        setImages(profile.user.image.url);
      } else {
        setImages(profile.user.image);
      }
    }
  }, [profile]);
  const styleUpload = {
    display: images ? "block" : "none",
  };
  return (
    <>
      <form className="row  form-container" onSubmit={submitHandler}>
        <div className="col-md-12 img-thumbnail">
          <div className="author-card pb-0 pb-md-3">
            <div className="author-card-cover"></div>
            <div className="author-card-profile row">
              <div className="author-avatar col-md-4" style={styleUpload}>
                {loading ? (
                  <Loading />
                ) : (
                  <>
                    {images && (
                      <img
                        src={images ? images.url : images}
                        alt=""
                        style={styleUpload}
                        className="img-thumbnail"
                      />
                    )}
                  </>
                )}
              </div>

              {images ? (
                <div className="author-card-details col-md-2">
                  <h5 className="author-card-name mb-2" onClick={handleDestroy}>
                    X
                  </h5>
                </div>
              ) : (
                <div className="author-card-details col-md-2">
                  <h5 className="author-card-name mb-2">
                    <input
                      type="file"
                      name="file"
                      id="file_up"
                      onChange={handleUpload}
                    />
                  </h5>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form">
            <label for="account-fn">UserName</label>
            <input
              className="form-control"
              type="text"
              required
              value={states.name}
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
              value={states.email}
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
              value={states.phone_number}
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
              checked={states.sex == 1}
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
              checked={states.sex == 0}
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
              value={states.date_of_birth}
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
