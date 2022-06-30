import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { GlobalState, SwaleMessage } from "../imports/index";
import { DeleteCacheRedisInitial } from "../Redux/RedisSlice";

const useDelete = () => {
  const state = useContext(GlobalState);
  const [callbackAdmin, setCallbackAdmin] = state.callbackAdmin;
  const [runProduct, setRunProduct] = state.runProduct;
  const [callback, setCallback] = state.callback;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const mutate = async (url) => {
    try {
      setLoading(true);
      return await swal({
        title: "Are you sure you want delete ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          url();
          dispatch(DeleteCacheRedisInitial({ key: "products" }))
            .then((items) => {
              setRunProduct(!runProduct);
              setLoading(false);
              SwaleMessage(
                "Delete successfully, wait Loading... 😉 !",
                "success"
              );
            })
            .catch((error) => {
              SwaleMessage("Delete Fail, wait Loading... !", "error");
            });
        } else {
          SwaleMessage("Thank you for 😆'!");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return { mutate };
};

export default useDelete;
