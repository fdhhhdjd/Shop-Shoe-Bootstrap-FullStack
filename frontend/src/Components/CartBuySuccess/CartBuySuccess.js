import React, { useEffect } from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Header, MetaData, runFireworks } from "../../imports/index";
import { CartBuySuccessStyle } from "../../Styles/CartBuySuccessStyle";
const CartBuySuccess = () => {
  useEffect(() => {
    runFireworks();
  }, []);
  return (
    <React.Fragment>
      <CartBuySuccessStyle />
      <Header />
      <MetaData title="Buy-Success" />
      <div className="success-wrapper">
        <div className="success">
          <p className="icon">
            <BsBagCheckFill />
          </p>
          <br />
          <h2>Thank you for your order!</h2>
          <p className="email-msg">
            Check order your choose Profile continue choose OrderList.
          </p>
          <p className="description">
            If you have any questions, please email
            <a className="email" href="mailto:nguyentientai10@gmail.com">
              nguyentientai10@gmail.com
            </a>
          </p>
          <Link to="/">
            <button type="button" width="300px" className="btn">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CartBuySuccess;
