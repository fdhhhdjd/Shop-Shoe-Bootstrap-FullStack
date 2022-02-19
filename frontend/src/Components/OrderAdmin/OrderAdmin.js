import React from "react";
import {
  Sidebar,
  HeaderAdmin,
  MainProduct,
  MainOrder,
} from "../../imports/index";
const OrderAdmin = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <HeaderAdmin />
        <MainOrder />
      </main>
    </>
  );
};

export default OrderAdmin;
