import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { ProfileInitiate } from "../Redux/AuthenticationSlice";
const UserApi = (token) => {
  const dispatch = useDispatch();
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const { refreshToken, profile } = useSelector((state) => ({ ...state.data }));
  useEffect(() => {
    if (token) {
      dispatch(ProfileInitiate({ token }));

      const getUser = async () => {
        try {
          const res = await axios.get("/api/auth/profile", {
            headers: { Authorization: token },
          });
          setCart(res.data.user.cart);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
        } catch (err) {
          alert(err.response.data.msg);
        }
      };
      getUser();
    }
    profile.user && setCart(profile.user);
  }, [token]);
  const addCart = async (product) => {
    if (refreshToken.accessToken === undefined)
      return swal({
        title: "Please login to continue buying?",
        text: "Login Buy Now!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          window.location.href = "/login";
        } else {
          swal("Thank You For 🙃!");
        }
      });
    const check = cart.every((item) => {
      return item._id !== product._id;
    });

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);

      await axios.patch(
        "/api/auth/addcart",
        { cart: [...cart, { ...product, quantity: 1 }] },
        {
          headers: { Authorization: token },
        }
      );
      swal("Added cart successfully 😉 !", {
        icon: "success",
      });
    } else {
      swal("This product has been added to cart.", {
        icon: "error",
      });
    }
  };
  console.log("cart", cart);
  return {
    cart: [cart, setCart],
    addCart: addCart,
  };
};
export default UserApi;
