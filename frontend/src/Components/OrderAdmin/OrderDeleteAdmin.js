import React from "react";
import { HeaderAdmin, MainOrderDelete, Sidebar } from "../../imports/index";
const OrderDeleteAdmin = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <HeaderAdmin />
        <MainOrderDelete />
      </main>
    </>
  );
};

export default OrderDeleteAdmin;
