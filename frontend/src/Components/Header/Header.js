import React, { useContext } from "react";
import toastHot from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GlobalState } from "../../Context/GlobalState";
import { except } from "../../imports/importConstant";
import { MetaData } from "../../imports/index";
import { LogoutInitiate } from "../../Redux/AuthenticationSlice";
import HeaderData from "../../utils/data/HeaderData";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { refreshToken, profile } = useSelector((state) => ({
    ...state.data,
  }));
  const state = useContext(GlobalState);
  const [cart] = state.UserApi.cart;
  const [search, setSearch] = state.ProductApi.search;
  const cartItems = cart;

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(LogoutInitiate({ navigate, toast })).then((item) => {
      if (item.payload.status === 200) {
        localStorage.clear();
        <MetaData title={`Home Page`} />;
        toastHot.loading("Redirecting...");
      }
    });
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
              {HeaderData.map((item) => {
                return (
                  <React.Fragment key={item.id}>
                    <a href={item.address} target={item.navigate}>
                      <i className={item.icon}></i>
                    </a>
                  </React.Fragment>
                );
              })}
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
                  <Link className="navbar-brand" to="/">
                    <img alt="logo" src="/images/logo.png" />
                  </Link>
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
                        <Link className="dropdown-item" to="/login">
                          Login
                        </Link>

                        <Link className="dropdown-item" to="/register">
                          Register
                        </Link>
                      </div>
                    </div>
                  )}

                  <Link to="/cart" className="cart-mobile-icon">
                    <i className="fas fa-shopping-bag"></i>
                    <span className="badge1">{cartItems?.length}</span>
                  </Link>
                </div>
                <div className="col-12 d-flex align-items-center">
                  <form onSubmit={submitHandler} className="input-group">
                    <input
                      type="search"
                      className="form-control rounded search"
                      placeholder="Search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
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
                <Link className="navbar-brand" to="/">
                  <img alt="logo" src="/images/logo.png" />
                </Link>
              </div>
              <div className="col-md-6 col-8 d-flex align-items-center">
                <form onSubmit={submitHandler} className="input-group">
                  <input
                    type="search"
                    className="form-control rounded search"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  {search ? (
                    <button className="search-button1">
                      <div className="spinner-grow text-success" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </button>
                  ) : (
                    <button type="submit" className="search-button">
                      search
                    </button>
                  )}
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
                      Hi, {profile.user && except(profile.user.name, 18)}
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
                    <Link to="/register">Register</Link>
                    <Link to="/login">Login</Link>
                  </>
                )}

                <Link to="/cart">
                  <i className="fas fa-shopping-bag"></i>
                  <span className="badge1 badge">{cartItems?.length}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
