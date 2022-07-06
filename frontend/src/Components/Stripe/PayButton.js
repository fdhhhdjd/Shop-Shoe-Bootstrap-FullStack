import axios from "axios";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../../imports";
import { StripeInitial } from "../../Redux/OrderSlice";
import { AddToCart } from "../../utils/Api";
const PayButton = ({ CheckCountInStock }) => {
  const { profile, refreshToken } = useSelector((state) => ({ ...state.data }));
  const { paymentStripe, loading } = useSelector((state) => ({
    ...state.order,
  }));
  const state = useContext(GlobalState);
  const dispatch = useDispatch();
  const [cart, setCart] = state.UserApi.cart;
  const refreshTokens = refreshToken.accessToken;
  let cartItems = profile?.user?.cart;
  const addToCart = async (cart) => {
    await axios.patch(
      AddToCart(),
      { cart },
      {
        headers: { Authorization: refreshTokens },
      }
    );
  };
  const handleCheckout = async () => {
    dispatch(
      StripeInitial({
        cartItems,
        userId: profile._id,
        email: profile?.user?.email,
      })
    );
  };
  useEffect(() => {
    if (paymentStripe?.url) {
      toast.loading("Redirecting...");
      setCart([]);
      addToCart([]);
      window.location.href = paymentStripe.url;
    }
  }, [paymentStripe?.url]);
  useEffect(() => {
    if (loading == true) {
      toast.loading("Processing Payment...");
    }
  }, [loading]);
  return (
    <>
      {CheckCountInStock ? (
        loading ? (
          <button className="stripe1">
            <div className="spinner-grow text-info" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </button>
        ) : (
          <button onClick={handleCheckout} className="stripe">
            <i className="fab fa-stripe"></i> {"  "}Stripe
          </button>
        )
      ) : (
        ""
      )}
    </>
  );
};

export default PayButton;
