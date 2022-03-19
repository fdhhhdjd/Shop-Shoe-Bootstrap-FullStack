import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import {
  GetAllAdminInitiate,
  GetAllUserInitiate,
  NewUserInitiate,
  ProfileAdminInitiate,
} from "../Redux/AuthenticationAdminSlice";
import { ProfileInitiate } from "../Redux/AuthenticationSlice";
import {
  getAllUser,
  getAllAdmin,
  AddToCart,
  getProfiles,
} from "../imports/Import";
import { SwaleMessage } from "../imports/index";
const UserApi = (token, refreshTokensAdmin) => {
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const { refreshToken, profile } = useSelector((state) => ({ ...state.data }));
  const tokens = refreshTokensAdmin;
  useEffect(() => {
    if (token && token.length > 0) {
      dispatch(ProfileInitiate({ token }));

      const getUser = async () => {
        try {
          const res = await axios.get(getProfiles(), {
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
  //!Admin
  useEffect(() => {
    if (refreshTokensAdmin && refreshTokensAdmin.length > 0) {
      dispatch(ProfileAdminInitiate({ refreshTokensAdmin }));
      dispatch(GetAllAdminInitiate({ refreshTokensAdmin }));
      dispatch(GetAllUserInitiate({ refreshTokensAdmin }));
      dispatch(NewUserInitiate({ tokens }));
    }
  }, [refreshTokensAdmin]);
  useEffect(() => {
    if (refreshTokensAdmin && refreshTokensAdmin.length > 0) {
      const getProducts = async () => {
        const res = await axios.get(getAllUser(), {
          headers: { Authorization: refreshTokensAdmin },
        });
        const data = await axios.get(getAllAdmin(), {
          headers: { Authorization: refreshTokensAdmin },
        });
        setUsers(res.data.user);
        setAdmins(data.data.user);
      };
      getProducts();
    }
  }, [refreshTokensAdmin]);
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
        AddToCart(),
        { cart: [...cart, { ...product, quantity: 1 }] },
        {
          headers: { Authorization: token },
        }
      );
      SwaleMessage("Added cart successfully 😉 !", "success");
    } else {
      SwaleMessage("This product has been added to cart.", "error");
    }
  };
  return {
    cart: [cart, setCart],
    addCart: addCart,
    users: [users, setUsers],
    admins: [admins, setAdmins],
  };
};
export default UserApi;
