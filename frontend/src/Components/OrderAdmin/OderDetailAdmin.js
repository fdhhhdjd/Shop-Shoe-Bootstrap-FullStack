import React from "react";
import { OrderDetailMain, Sidebar, HeaderAdmin } from "../../imports/index";
import { useParams } from "react-router-dom";

const OderDetailAdmin = () => {
  const { id } = useParams();
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <HeaderAdmin />
        <OrderDetailMain orderId={id} />
      </main>
    </>
  );
};

export default OderDetailAdmin;
