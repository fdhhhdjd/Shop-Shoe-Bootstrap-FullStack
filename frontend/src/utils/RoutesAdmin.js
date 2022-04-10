import {
  AddProduct,
  Categories,
  CreateEditInfo,
  CreateVoucher,
  EditAdmin,
  EditCategories,
  EditOrderAdmin,
  EditProduct,
  EditUser,
  FeedbackAdmin,
  ForgetAdmin,
  GoogleMap,
  Information,
  LoginAdmin,
  ManagerAdmin,
  ManagerUnchecked,
  ManagerUser,
  OderDetailAdmin,
  OrderAdmin,
  OrderDeleteAdmin,
  PrivateRouterAdmin,
  PrivateRouterAuthAdmin,
  Products,
  ProfileAdmins,
  RegisterAdmin,
  ReplyUser,
  ResetAdmin,
  Vouchers,
} from "../imports/index";
import { HomeAdmin } from "../imports/LazyRouter";

const RoutesDataAdmin = [
  //*Route Admin and Check not logout please authentication
  {
    path: "loginAdmin",
    private: <PrivateRouterAuthAdmin />,
    main: <LoginAdmin />,
  },
  {
    path: "registerAdmin",
    private: <PrivateRouterAuthAdmin />,
    main: <RegisterAdmin />,
  },
  {
    path: "forgetAdmin",
    private: <PrivateRouterAuthAdmin />,
    main: <ForgetAdmin />,
  },
  {
    path: "password/admin/reset/:token",
    private: <PrivateRouterAuthAdmin />,
    main: <ResetAdmin />,
  },
  //*RouteAdmin check Login please page main
  {
    path: "homeAdmin",
    private: <PrivateRouterAdmin />,
    main: <HomeAdmin />,
  },
  {
    path: "profileAdmin",
    private: <PrivateRouterAdmin />,
    main: <ProfileAdmins />,
  },
  {
    path: "products",
    private: <PrivateRouterAdmin />,
    main: <Products />,
  },
  {
    path: "orders",
    private: <PrivateRouterAdmin />,
    main: <OrderAdmin />,
  },
  {
    path: "users",
    private: <PrivateRouterAdmin />,
    main: <ManagerUser />,
  },
  {
    path: "unusers",
    private: <PrivateRouterAdmin />,
    main: <ManagerUnchecked />,
  },
  {
    path: "editUsers/:id",
    private: <PrivateRouterAdmin />,
    main: <EditUser />,
  },
  {
    path: "editAdmins/:id",
    private: <PrivateRouterAdmin />,
    main: <EditAdmin />,
  },
  {
    path: "admins",
    private: <PrivateRouterAdmin />,
    main: <ManagerAdmin />,
  },
  {
    path: "category",
    private: <PrivateRouterAdmin />,
    main: <Categories />,
  },
  {
    path: "voucher",
    private: <PrivateRouterAdmin />,
    main: <Vouchers />,
  },
  {
    path: "editVoucher/:id",
    private: <PrivateRouterAdmin />,
    main: <CreateVoucher />,
  },
  {
    path: "createVoucher",
    private: <PrivateRouterAdmin />,
    main: <CreateVoucher />,
  },
  {
    path: "createVoucher",
    private: <PrivateRouterAdmin />,
    main: <CreateVoucher />,
  },
  {
    path: "editCategory/:id",
    private: <PrivateRouterAdmin />,
    main: <EditCategories />,
  },
  {
    path: "createCategory",
    private: <PrivateRouterAdmin />,
    main: <EditCategories />,
  },
  {
    path: "DeleteOrders",
    private: <PrivateRouterAdmin />,
    main: <OrderDeleteAdmin />,
  },
  {
    path: "orders/:id",
    private: <PrivateRouterAdmin />,
    main: <OderDetailAdmin />,
  },
  {
    path: "editOrders/:id",
    private: <PrivateRouterAdmin />,
    main: <EditOrderAdmin />,
  },
  {
    path: "addProduct",
    private: <PrivateRouterAdmin />,
    main: <AddProduct />,
  },
  {
    path: "editProduct/:id",
    private: <PrivateRouterAdmin />,
    main: <EditProduct />,
  },
  {
    path: "info",
    private: <PrivateRouterAdmin />,
    main: <Information />,
  },
  {
    path: "createInfo",
    private: <PrivateRouterAdmin />,
    main: <CreateEditInfo />,
  },
  {
    path: "editInfo/:id",
    private: <PrivateRouterAdmin />,
    main: <CreateEditInfo />,
  },
  {
    path: "feedback",
    private: <PrivateRouterAdmin />,
    main: <FeedbackAdmin />,
  },
  {
    path: "replyuser/:id",
    private: <PrivateRouterAdmin />,
    main: <ReplyUser />,
  },
  {
    path: "googlemap",
    private: <PrivateRouterAdmin />,
    main: <GoogleMap />,
  },
];
export default RoutesDataAdmin;
