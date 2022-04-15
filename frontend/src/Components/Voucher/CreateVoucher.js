import React from "react";
import { MainCreateVoucher, Sidebar, HeaderAdmin } from "../../imports/index";
const CreateVoucher = () => {
  return (
    <>
      <Sidebar />

      <main className="main-wrap">
        <HeaderAdmin />
        <MainCreateVoucher />
      </main>
    </>
  );
};

export default CreateVoucher;
