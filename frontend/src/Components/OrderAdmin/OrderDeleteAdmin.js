import React from "react";
import { Sidebar, HeaderAdmin, MainOrderDelete } from "../../imports/index";
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
