import React, { Suspense } from "react";
import "./App.css";
import "./responsive.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  Login,
  NotFound,
  Register,
  Forget,
  Reset,
  Profile,
  DetailProduct,
  OrderScreen,
  LoginAdmin,
  Products,
  PrivateRouterAdmin,
  PrivateRouter,
  CartScreen,
  RegisterAdmin,
  ForgetAdmin,
  Loadings,
  PrivateRouterAuthAdmin,
  PrivateRouterAuth,
  AddProduct,
  EditProduct,
  ResetAdmin,
  ScrollTop,
  ProfileAdmins,
  OrderAdmin,
  OderDetailAdmin,
  OrderDeleteAdmin,
  ManagerUser,
  ManagerAdmin,
  EditUser,
  EditAdmin,
  Categories,
  EditCategories,
  EditOrderAdmin,
  Vouchers,
  CreateVoucher,
} from "./imports/index";
import { HomeAdmin, Home } from "./imports/LazyRouter";
function App() {
  return (
    <>
      <Suspense fallback={<Loadings />}>
        <ToastContainer position="top-center" />
        <ScrollTop />
        <Routes>
          <Route element={<PrivateRouterAuth />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<PrivateRouterAuth />}>
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<PrivateRouterAuth />}>
            <Route path="/forget" element={<Forget />} />
          </Route>
          <Route path="/password/reset/:token" element={<Reset />} />
          <Route element={<PrivateRouter />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<DetailProduct />} />
          <Route element={<PrivateRouter />}>
            <Route path="/cart" element={<CartScreen />} />
          </Route>
          <Route element={<PrivateRouter />}>
            <Route path="/order/:id" element={<OrderScreen />} />
          </Route>
          {/* Admin */}
          <Route element={<PrivateRouterAuthAdmin />}>
            <Route path="/loginAdmin" element={<LoginAdmin />} />
          </Route>
          <Route element={<PrivateRouterAuthAdmin />}>
            <Route path="/registerAdmin" element={<RegisterAdmin />} />
          </Route>
          <Route element={<PrivateRouterAuthAdmin />}>
            <Route path="/forgetAdmin" element={<ForgetAdmin />} />
          </Route>
          <Route path="/password/admin/reset/:token" element={<ResetAdmin />} />
          <Route element={<PrivateRouterAdmin />}>
            <Route path="/homeAdmin" element={<HomeAdmin />} />
          </Route>
          <Route element={<PrivateRouterAdmin />}>
            <Route path="/profileAdmin" element={<ProfileAdmins />} />
          </Route>
          <Route element={<PrivateRouterAdmin />}>
            <Route path="/products" element={<Products />} />
          </Route>
          <Route element={<PrivateRouterAdmin />}>
            <Route path="/orders" element={<OrderAdmin />} />
          </Route>
          <Route element={<PrivateRouterAdmin />}>
            <Route path="/users" element={<ManagerUser />} />
          </Route>
          <Route element={<PrivateRouterAdmin />}>
            <Route path="/editUsers/:id" element={<EditUser />} />
          </Route>
          <Route element={<PrivateRouterAdmin />}>
            <Route path="/editAdmins/:id" element={<EditAdmin />} />
          </Route>
          <Route element={<PrivateRouterAdmin />}>
            <Route path="/admins" element={<ManagerAdmin />} />
          </Route>
          <Route element={<PrivateRouterAdmin />}>
            <Route path="/category" element={<Categories />} />
          </Route>
          <Route element={<PrivateRouterAdmin />}>
            <Route path="/voucher" element={<Vouchers />} />
          </Route>
          <Route element={<PrivateRouterAdmin />}>
            <Route path="/editVoucher/:id" element={<CreateVoucher />} />
          </Route>
          <Route element={<PrivateRouterAdmin />}>
            <Route path="/createVoucher" element={<CreateVoucher />} />
          </Route>
          <Route element={<PrivateRouterAdmin />}>
            <Route path="/editCategory/:id" element={<EditCategories />} />
          </Route>
          <Route element={<PrivateRouterAdmin />}>
            <Route path="/createCategory" element={<EditCategories />} />
          </Route>
          <Route element={<PrivateRouterAdmin />}>
            <Route path="/DeleteOrders" element={<OrderDeleteAdmin />} />
          </Route>

          <Route element={<PrivateRouterAdmin />}>
            <Route path="/orders/:id" element={<OderDetailAdmin />} />
          </Route>
          <Route element={<PrivateRouterAdmin />}>
            <Route path="/editOrders/:id" element={<EditOrderAdmin />} />
          </Route>
          <Route element={<PrivateRouterAdmin />}>
            <Route path="/addProduct" element={<AddProduct />} />
          </Route>
          <Route element={<PrivateRouterAdmin />}>
            <Route path="/editProduct/:id" element={<EditProduct />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
