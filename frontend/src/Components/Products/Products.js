import React from "react";
import {
  Sidebar,
  HeaderAdmin,
  MainProduct,
  MetaData,
} from "../../imports/index";
const Products = () => {
  return (
    <>
      <Sidebar />
      <MetaData title="Manager-Product" />

      <main className="main-wrap">
        <HeaderAdmin />
        <MainProduct />
      </main>
    </>
  );
};

export default Products;
