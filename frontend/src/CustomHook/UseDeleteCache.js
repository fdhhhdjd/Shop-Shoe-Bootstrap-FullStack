import { useContext } from "react";
import { useDispatch } from "react-redux";
import { GlobalState } from "../imports/index";
import { DeleteCacheRedisInitial } from "../Redux/RedisSlice";

const useDeleteCache = () => {
  const state = useContext(GlobalState);
  const [runProduct, setRunProduct] = state.runProduct;
  const [runAllUser, setRunAllUser] = state.UserApi.runAllUser;
  const dispatch = useDispatch();
  const CacheRedis = async ({ key }) => {
    try {
      dispatch(DeleteCacheRedisInitial({ key: key }))
        .then((item) => {
          switch (key) {
            case "products":
              setRunProduct(!runProduct);
              break;
            case "users" || "uncheck":
              setRunAllUser(!runAllUser);
              break;
            default:
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return { CacheRedis };
};

export default useDeleteCache;
