import axios from "axios";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { GlobalState } from "../../imports";
import { AddToCart } from "../../utils/Api";
const PayButton = () => {
  const { profile, refreshToken } = useSelector((state) => ({ ...state.data }));
  const state = useContext(GlobalState);
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
    await axios
      .post("/api/payment/paymentStripe", {
        cartItems,
        userId: profile._id,
        email: profile?.user?.email,
      })
      .then(async (response) => {
        console.log(response);

        if (response.data.url) {
          // setCart([]);
          // addToCart([]);
          toast.loading("Redirecting...");
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <button onClick={() => handleCheckout()}>Check out</button>
    </>
  );
};

export default PayButton;
