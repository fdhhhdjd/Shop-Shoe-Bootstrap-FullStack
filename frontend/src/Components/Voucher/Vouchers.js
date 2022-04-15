import React from "react";
import {
  Sidebar,
  HeaderAdmin,
  MainVoucher,
  MetaData,
} from "../../imports/index";

const Vouchers = () => {
  return (
    <>
      <Sidebar />
      <MetaData title="Manager-Voucher" />

      <main className="main-wrap">
        <HeaderAdmin />
        <MainVoucher />
      </main>
    </>
  );
};

export default Vouchers;
