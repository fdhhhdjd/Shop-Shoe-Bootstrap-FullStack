import React from "react";
import { HeaderAdmin, MainOrder, Sidebar } from "../../imports/index";
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
