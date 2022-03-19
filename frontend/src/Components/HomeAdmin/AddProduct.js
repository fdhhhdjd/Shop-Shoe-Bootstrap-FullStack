import React from "react";
import { AddProductMain, HeaderAdmin, Sidebar } from "../../imports/index";
const AddProduct = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <HeaderAdmin />
        <AddProductMain />
      </main>
    </>
  );
};

export default AddProduct;
