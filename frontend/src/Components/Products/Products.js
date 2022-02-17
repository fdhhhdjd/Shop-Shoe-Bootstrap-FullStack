import React from "react";
import { Sidebar, HeaderAdmin, MainProduct } from "../../imports/index";
const Products = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <HeaderAdmin />
        <MainProduct />
      </main>
    </>
  );
};

export default Products;
