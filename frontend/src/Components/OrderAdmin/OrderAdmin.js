import React from "react";
import { HeaderAdmin, MainOrder, Sidebar, MetaData } from "../../imports/index";
const OrderAdmin = () => {
  return (
    <>
      <Sidebar />
      <MetaData title="Manager-Order-Customer" />
      <main className="main-wrap">
        <HeaderAdmin />
        <MainOrder />
      </main>
    </>
  );
};

export default OrderAdmin;
