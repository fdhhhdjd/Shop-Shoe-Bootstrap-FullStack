import React from "react";
import { Sidebar, HeaderAdmin, AddProductMain } from "../../imports/index";
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
