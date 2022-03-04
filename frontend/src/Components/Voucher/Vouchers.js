import React from "react";
import { Sidebar, HeaderAdmin, MainVoucher } from "../../imports/index";

const Vouchers = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <HeaderAdmin />
        <MainVoucher />
      </main>
    </>
  );
};

export default Vouchers;
