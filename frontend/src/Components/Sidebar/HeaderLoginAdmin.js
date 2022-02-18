import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogoutInitiate } from "../../Redux/AuthenticationSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { GlobalState } from "../../Context/GlobalState";
const HeaderLoginAdmin = () => {
  const [keyword, setKeyword] = useState();
  const dispatch = useDispatch();
  const { refreshToken, profile } = useSelector((state) => ({ ...state.data }));
  const state = useContext(GlobalState);

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(LogoutInitiate());
    toast.success("Logout Success Thank You!");
  };
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div className="Announcement ">
        <div className="container">
          <div className="row">
            <div className="col-md-6 d-flex align-items-center display-none">
              <p>
                <a href="tel:+0798805741" style={{ color: "white" }}>
                  +079 880 5741
                </a>
              </p>
              <p>
                <a
                  href="mailto:nguyentientai10@gmail.com"
                  style={{ color: "white" }}
                >
                  nguyentientai10@gmail.com
                </a>
              </p>
            </div>
            <div className=" col-12 col-lg-6 justify-content-center justify-content-lg-end d-flex align-items-center">
              <a
                href="https://www.facebook.com/profile.php?id=100006139249437"
                target="_blank"
              >
                <i className="fab fa-facebook-f"></i>
              </a>

              <a
                href="https://www.instagram.com/nguyentientai10/"
                target="_blank"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/ti%E1%BA%BFn-t%C3%A0i-nguy%E1%BB%85n-787545213/"
                target="_blank"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://profile-forme.surge.sh/" target="_blank">
                <i className="far fa-id-badge"></i>
              </a>
              <a href="https://profile-forme.surge.sh/" target="_blank">
                <i className="fas fa-user"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Header */}
      <div className="header">
        <div className="container">
          {/* MOBILE HEADER */}
          <div className="mobile-header">
            <div className="container ">
              <div className="row ">
                <div className="col-6 d-flex align-items-center">
                  <a
                    className="navbar-brand"
                    href="https://profile-forme.surge.sh/"
                    target="_blank"
                  >
                    <img alt="logo" src="/images/logo1.png" />
                  </a>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                  {refreshToken && refreshToken.success ? (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/profile">
                          Profile
                        </Link>

                        <Link
                          className="dropdown-item"
                          to="#"
                          onClick={logoutHandler}
                        >
                          Logout
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="btn-group">
                      <button
                        type="button"
                        className="name-button dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="fas fa-user"></i>
                      </button>
                      <div className="dropdown-menu">
                        <Link className="dropdown-item" to="/loginAdmin">
                          Login
                        </Link>

                        <Link className="dropdown-item" to="/registerAdmin">
                          Register
                        </Link>
                      </div>
                    </div>
                  )}

                  <span className="cart-mobile-icon">
                    <i className="fa-solid fa-lock"></i>
                  </span>
                </div>
                <div className="col-12 d-flex align-items-center">
                  <form onSubmit={submitHandler} className="input-group">
                    <input
                      type="search"
                      className="form-control rounded search"
                      placeholder="Search"
                    />
                    <button type="submit" className="search-button">
                      search
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* PC HEADER */}
          <div className="pc-header">
            <div className="row">
              <div className="col-md-3 col-4 d-flex align-items-center">
                <a
                  className="navbar-brand"
                  href="https://profile-forme.surge.sh/"
                  target="_blank"
                >
                  <img alt="logo" src="/images/logo1.png" />
                </a>
              </div>
              <div className="col-md-6 col-8 d-flex align-items-center">
                <form onSubmit={submitHandler} className="input-group">
                  <input
                    type="search"
                    className="form-control rounded search"
                    placeholder="Search"
                  />
                  <button type="submit" className="search-button">
                    search
                  </button>
                </form>
              </div>
              <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                {refreshToken && refreshToken.success ? (
                  <div className="btn-group">
                    <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Hi, {profile.user && profile.user.name}
                    </button>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>
                      <Link className="dropdown-item" to="/cart ">
                        Payment
                      </Link>
                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={logoutHandler}
                      >
                        Logout
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <Link to="/registerAdmin">Register</Link>
                    <Link to="/loginAdmin">Login</Link>
                  </>
                )}

                <span>
                  <i className="fa-solid fa-lock"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderLoginAdmin;
