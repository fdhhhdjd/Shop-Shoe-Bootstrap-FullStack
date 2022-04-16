import {
  CartScreen,
  DetailProduct,
  Forget,
  Login,
  OrderScreen,
  PrivateRouter,
  PrivateRouterAuth,
  Profile,
  Register,
  Reset,
} from "../imports/index";
import { Home } from "../imports/LazyRouter";

const RoutesDataUser = [
  //*Route User and Check not logout please authentication
  {
    path: "login",
    private: <PrivateRouterAuth />,
    main: <Login />,
  },
  {
    path: "register",
    private: <PrivateRouterAuth />,
    main: <Register />,
  },
  {
    path: "forget",
    private: <PrivateRouterAuth />,
    main: <Forget />,
  },
  {
    path: "password/reset/:token",
    private: <PrivateRouterAuth />,
    main: <Reset />,
  },
  //*RouteUser check Login please page main
  {
    path: "",
    private: null,
    main: <Home />,
  },
  {
    path: "profile",
    private: <PrivateRouter />,
    main: <Profile />,
  },
  {
    path: "products/:id",
    private: null,
    main: <DetailProduct />,
  },
  {
    path: "cart",
    private: <PrivateRouter />,
    main: <CartScreen />,
  },
  {
    path: "order/:id",
    private: <PrivateRouter />,
    main: <OrderScreen />,
  },
];
export default RoutesDataUser;
