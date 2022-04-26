import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { GlobalState } from "../../Context/GlobalState";
import { AddToCart, TranSuccess } from "../../imports/Import";
import {
  Header,
  LazyLoadImg,
  Loading,
  MetaData,
  Paypal,
  PhoneRight,
  SwaleMessage,
} from "../../imports/index";
import { GetTotalVoucherInitial, reset } from "../../Redux/VoucherSlice";
// import PayButton from "../Stripe/PayButton";
const initialState = {
  voucher_code: "",
};
const CartScreen = () => {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.UserApi.cart;
  const { refreshToken } = useSelector((state) => ({ ...state.data }));
  const { totals, Message, loadings } = useSelector((state) => ({
    ...state.vouchers,
  }));
  const navigate = useNavigate();
  const refreshTokens = refreshToken.accessToken;
  const token = refreshToken.accessToken;
  const [total, setTotal] = useState(0);
  const [cost, setCost] = useState(0);
  const [percent, setPercent] = useState();
  const [vouchers, setVouchers] = useState(initialState);
  const { voucher_code } = vouchers;
  const [ToggleVoucher, SetToggleVoucher] = useState(false);
  const dispatch = useDispatch();
  const cartItems = cart;
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(GetTotalVoucherInitial({ token, voucher_code }));
  };
  useEffect(() => {
    if (totals.length === 0) {
      const getTotal = () => {
        const total = cart.reduce((prev, item) => {
          return prev + item.price * item.quantity;
        }, 0);
        setTotal(total);
      };
      getTotal();
    } else {
      dispatch(GetTotalVoucherInitial({ token, voucher_code }));
      setTotal(totals.totalCart);
      setCost(totals.cost);
      setPercent(totals.voucher && totals.voucher.value);
    }
  }, [cart]);
  useEffect(() => {
    if (totals.length === 0) {
      const getTotal = () => {
        const total = cart.reduce((prev, item) => {
          return prev + item.price * item.quantity;
        }, 0);
        setTotal(total);
        setCost(totals.cost);
      };
      getTotal();
    } else {
      setTotal(totals.totalCart);
      setCost(totals.cost);
      setPercent(totals.voucher && totals.voucher.value);
    }
  }, [totals, cost]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVouchers({ ...vouchers, [name]: value });
  };
  const addToCart = async (cart) => {
    await axios.patch(
      AddToCart(),
      { cart },
      {
        headers: { Authorization: refreshTokens },
      }
    );
  };
  const HandleIncrement = (id, sock) => {
    cart.forEach((item) => {
      if (item._id === id) {
        if (item.quantity === sock)
          return SwaleMessage("The company has sold out", "warning");
        item.quantity += 1;
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };
  const handleDecrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        if (item.quantity <= 1) {
          removeFromCartHandle(id);
        } else {
          item.quantity -= 1;
        }
      }
    });
    setCart([...cart]);
    addToCart(cart);
  };
  const removeFromCartHandle = async (id) => {
    return await swal({
      title: "Are you sure you want delete ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        cart.forEach((item, index) => {
          if (item._id === id) {
            cart.splice(index, 1);
          }
        });
        setCart([...cart]);
        addToCart(cart);
        SwaleMessage("Delete Car successfully !", "success");
      } else {
        SwaleMessage("Thank you for 😆 !");
      }
    });
  };
  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment;

    await axios.post(
      TranSuccess(),
      { cart, paymentID, address },
      {
        headers: { Authorization: refreshTokens },
      }
    );

    setCart([]);
    addToCart([]);
    SwaleMessage("You have successfully placed an order.", "success");
    window.location.href = "/success";
  };

  useEffect(() => {
    if (Message.status === 200) {
      SwaleMessage(Message.msg, "success");
      setVouchers({ voucher_code: "" });
      dispatch(reset());
    } else if (Message.status === 400) {
      SwaleMessage(Message.msg, "error");
      dispatch(reset());
    }
  }, [totals]);

  return (
    <>
      <>
        <Header />
        <MetaData title={`Store Cart`} />
        <PhoneRight />
        {/* Cart */}
        <div className="container">
          {cartItems && cartItems.length === 0 ? (
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
              {cartItems &&
                cartItems.map((item, index) => (
                  <div className="cart-iterm row" key={index}>
                    <div
                      className="remove-button d-flex justify-content-center align-items-center"
                      onClick={() => removeFromCartHandle(item._id)}
                    >
                      <i className="fas fa-times"></i>
                    </div>
                    <div className="cart-image col-md-3">
                      {item.image && <LazyLoadImg url={item.image?.url} />}
                    </div>
                    <div className="cart-text col-md-5 d-flex align-items-center">
                      <Link to={`/products/${item.product}`}>
                        <h4>{item.name}</h4>
                      </Link>
                    </div>
                    <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                      <h6>QUANTITY</h6>

                      <button
                        onClick={() => handleDecrement(item._id)}
                        className="btn btn-success btn-sm col-md-8"
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <br />
                      <span className="cart-price mt-3 mt-md-0 col-md-4 align-items-sm-end align-items-start  d-flex flex-column justify-content-center ">
                        {item.quantity}
                      </span>
                      <br />
                      <button
                        onClick={() =>
                          HandleIncrement(item._id, item.countInStock)
                        }
                        className="btn btn-success btn-sm col-md-8"
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                      {/* <select
                      onClick={() => HandleIncrement(item._id)}
                      name="quantity"
                      value={quantity}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select> */}
                    </div>
                    <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                      <h6>PRICE</h6>
                      <h4>${item.price}</h4>
                    </div>
                  </div>
                ))}

              {/* End of cart iterms */}
              <form className="total" onSubmit={handleSubmit}>
                {loadings ? "" : <span className="sub">Code Voucher:</span>}
                {ToggleVoucher ? (
                  <>
                    {loadings ? (
                      <Loading />
                    ) : (
                      <>
                        <input
                          type="text"
                          value={voucher_code}
                          name="voucher_code"
                          style={{
                            borderRadius: "0.5rem",
                            border: "0.5px solid black",
                          }}
                          onChange={handleChange}
                          className="b"
                        />
                        &nbsp;&nbsp;
                        <button className="btn btn-success btn-sm col-md-1">
                          Send
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <span
                    style={{
                      color: "blue",
                      borderBottom: "1px solid blue",
                      cursor: "pointer",
                    }}
                    onClick={() => SetToggleVoucher(true)}
                  >
                    Voucher If you want Enter!
                  </span>
                )}
              </form>
              {cost !== undefined && (
                <div className="total">
                  <span className="sub">Cost:</span>
                  <del>
                    <span
                      className="divider total-price"
                      style={{ color: "red" }}
                    >
                      ${cost}
                    </span>
                  </del>
                </div>
              )}
              {percent !== undefined && (
                <div className="total">
                  <span className="sub">percent:</span>

                  <span
                    className="divider total-price"
                    style={{ color: "green" }}
                  >
                    {percent}%
                  </span>
                </div>
              )}
              <div className="total">
                <span className="sub">
                  {cost === undefined ? "Total:" : "Total Sell"}
                </span>
                <span className="total-price">${total}</span>
              </div>

              <hr />

              <div className="cart-buttons d-flex align-items-center row">
                <Link to="/" className="col-md-6 ">
                  <button>Continue To Shopping</button>
                </Link>
                {/* {total > 0 && ( */}
                {/* // */}

                <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                  <button className="paypal">
                    <Paypal total={total} tranSuccess={tranSuccess} />
                  </button>
                </div>
                {/* <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                  <PayButton />
                </div> */}

                {/* )} */}
              </div>
            </>
          )}
        </div>
      </>
    </>
  );
};

export default CartScreen;
