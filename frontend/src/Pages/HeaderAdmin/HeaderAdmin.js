import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";
import { LogoutAdminInitiate } from "../../Redux/AuthenticationAdminSlice";
import { toast } from "react-toastify";
const HeaderAdmin = () => {
  const { profileAdmin } = useSelector((state) => ({ ...state.admin }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    $("[data-trigger]").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      var offcanvas_id = $(this).attr("data-trigger");
      $(offcanvas_id).toggleClass("show");
    });

    $(".btn-aside-minimize").on("click", function () {
      if (window.innerWidth < 768) {
        $("body").removeClass("aside-mini");
        $(".navbar-aside").removeClass("show");
      } else {
        // minimize sidebar on desktop
        $("body").toggleClass("aside-mini");
      }
    });
  }, []);
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(LogoutAdminInitiate({ navigate, toast }));
  };

  return (
    <>
      <header className="main-header navbar">
        <div className="col-search">
          <form className="searchform">
            <div className="input-group">
              <input
                list="search_terms"
                type="text"
                className="form-control"
                placeholder="Search term"
              />
              <button className="btn btn-light bg" type="button">
                <i className="far fa-search"></i>
              </button>
            </div>
            <datalist id="search_terms">
              <option value="Products" />
              <option value="New orders" />
              <option value="Apple iphone" />
              <option value="Ahmed Hassan" />
            </datalist>
          </form>
        </div>
        <div className="col-nav">
          <button
            className="btn btn-icon btn-mobile me-auto"
            data-trigger="#offcanvas_aside"
          >
            <i className="md-28 fas fa-bars"></i>
          </button>
          <ul className="nav">
            <li className="nav-item">
              <Link className={`nav-link btn-icon `} title="Dark mode" to="#">
                <i className="fas fa-moon"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn-icon" to="#">
                <i className="fas fa-bell"></i>
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" to="#">
                Vietnamese
              </a>
            </li>
            <li className="dropdown nav-item">
              <Link
                className="dropdown-toggle"
                data-bs-toggle="dropdown"
                to="#"
              >
                {profileAdmin.user && (
                  <img
                    className="img-xs rounded-circle"
                    src={profileAdmin.user.image.url}
                    alt="User"
                  />
                )}
              </Link>
              <div className="dropdown-menu dropdown-menu-end">
                <Link className="dropdown-item" to="/profileAdmin">
                  My profile
                </Link>
                <Link className="dropdown-item" to="#">
                  Settings
                </Link>
                <Link
                  onClick={logoutHandler}
                  className="dropdown-item text-danger"
                  to="#"
                >
                  Exit
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default HeaderAdmin;
