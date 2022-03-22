import { useContext, useState } from "react";
import swal from "sweetalert";
import { GlobalState, SwaleMessage } from "../imports/index";

const useDelete = () => {
  const state = useContext(GlobalState);
  const [callbackAdmin, setCallbackAdmin] = state.callbackAdmin;
  const [callback, setCallback] = state.callback;
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
          setCallback(!callback);
          setCallbackAdmin(!callbackAdmin);
          setLoading(false);
          SwaleMessage("Delete successfully, wait Loading... 😉 !", "success");
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
