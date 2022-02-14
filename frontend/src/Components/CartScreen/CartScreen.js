import React, { useEffect, useContext, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "../../imports/index";
import { AddToCartInitial } from "../../Redux/ProductSlice";
import { GlobalState } from "../../Context/GlobalState";
const CartScreen = () => {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.UserApi.cart;
  const { refreshToken } = useSelector((state) => ({ ...state.data }));
  const [total, setTotal] = useState(0);
  const cartItems = cart;
  const removeFromCartHandle = (id) => {};
  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      setTotal(total);
    };
    getTotal();
  }, [cart]);
  return (
    <>
      <>
        <Header />
        {/* Cart */}
        <div className="container">
          {cartItems.length === 0 ? (
            <div className=" alert alert-info text-center mt-3">
              Your cart is empty
              <Link
                className="btn btn-success mx-5 px-5 py-3"
                to="/"
                style={{
                  fontSize: "12px",
                }}
              >
                SHOPPING NOW
              </Link>
            </div>
          ) : (
            <>
              <div className=" alert alert-info text-center mt-3">
                Total Cart Products
                <Link className="text-success mx-2" to="/cart">
                  ({cartItems.length})
                </Link>
              </div>
              {/* cartiterm */}
              {cartItems.map((item) => (
                <div className="cart-iterm row">
                  <div
                    onClick={() => removeFromCartHandle(item.product)}
                    className="remove-button d-flex justify-content-center align-items-center"
                  >
                    <i className="fas fa-times"></i>
                  </div>
                  <div className="cart-image col-md-3">
                    <img src={item.image.url} alt={item.name} />
                  </div>
                  <div className="cart-text col-md-5 d-flex align-items-center">
                    <Link to={`/products/${item.product}`}>
                      <h4>{item.name}</h4>
                    </Link>
                  </div>
                  <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                    <h6>QUANTITY</h6>
                    <select
                      value={item.qty}
                      //   onChange={(e) =>
                      //     dispatch(
                      //       addToCart(item.product, Number(e.target.value))
                      //     )
                      //   }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                    <h6>PRICE</h6>
                    <h4>${item.price}</h4>
                  </div>
                </div>
              ))}

              {/* End of cart iterms */}
              <div className="total">
                <span className="sub">total:</span>
                <span className="total-price">${total}</span>
              </div>
              <hr />
              <div className="cart-buttons d-flex align-items-center row">
                <Link to="/" className="col-md-6 ">
                  <button>Continue To Shopping</button>
                </Link>
                {total > 0 && (
                  <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                    <button>Checkout</button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </>
    </>
  );
};

export default CartScreen;
