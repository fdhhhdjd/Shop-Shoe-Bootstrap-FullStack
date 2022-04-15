import React from "react";
import {
  AddProductMain,
  HeaderAdmin,
  Sidebar,
  MetaData,
} from "../../imports/index";
const AddProduct = () => {
  return (
    <>
      <Sidebar />
      <MetaData title="Add-Product" />
      <main className="main-wrap">
        <HeaderAdmin />
        <AddProductMain />
      </main>
    </>
  );
};

export default AddProduct;
