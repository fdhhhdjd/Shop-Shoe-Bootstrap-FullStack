import React from "react";
import { Link, NavLink } from "react-router-dom";
const Sidebar = () => {
  return (
    <>
      <div>
        <aside className="navbar-aside" id="offcanvas_aside">
          <div className="aside-top">
            <Link to="/homeAdmin" className="brand-wrap">
              <img
                src="/images/logo1.png"
                style={{ height: "46" }}
                className="logo"
                alt="Ecommerce dashboard template"
              />
            </Link>
            <div>
              <button className="btn btn-icon btn-aside-minimize">
                <i className="text-muted fas fa-stream"></i>
              </button>
            </div>
          </div>

          <nav>
            <ul className="menu-aside">
              <li className="menu-item">
                <NavLink to="/homeAdmin" end className="menu-link">
                  <i className="icon fas fa-home"></i>
                  <span className="text">Dashboard</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink end to="/products" className="menu-link">
                  <i className="icon fas fa-shopping-bag"></i>
                  <span className="text">Products</span>
                </NavLink>
              </li>

              <li className="menu-item">
                <NavLink end to="/addproduct" className="menu-link">
                  <i className="icon fas fa-cart-plus"></i>
                  <span className="text">Add product</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink end to="/category" className="menu-link">
                  <i className="icon fas fa-list"></i>
                  <span className="text">Categories</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink end to="/orders" className="menu-link">
                  <i className="icon fas fa-bags-shopping"></i>
                  <span className="text">Orders</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink end to="/users" className="menu-link">
                  <i className="icon fas fa-user"></i>
                  <span className="text">Users</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink end to="/admins" className="menu-link">
                  <i className="icon fa fa-user-times"></i>
                  <span className="text">Admins</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink end to="/voucher" className="menu-link ">
                  <i className="icon fas fa-store-alt"></i>
                  <span className="text">Voucher</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink end to="/info" className="menu-link ">
                  <i className="icon fa-solid fa-sitemap"></i>
                  <span className="text">Information</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink end to="/feedback" className="menu-link ">
                  <i className="icon fa-solid fa-comment"></i>
                  &nbsp;
                  <span className="text">FeedBack</span>
                </NavLink>
              </li>
              <li className="menu-item">
                <NavLink end to="/googlemap" className="menu-link ">
                  <i className="icon fa fa-map-marker"></i>
                  &nbsp;
                  <span className="text">Google Map</span>
                </NavLink>
              </li>

              {/* <li className="menu-item">
                <NavLink end to="/transaction" className="menu-link disabled">
                  <i className="icon fas fa-usd-circle"></i>
                  <span className="text">Transactions</span>
                </NavLink>
              </li> */}
            </ul>
            <br />
            <br />
          </nav>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;
