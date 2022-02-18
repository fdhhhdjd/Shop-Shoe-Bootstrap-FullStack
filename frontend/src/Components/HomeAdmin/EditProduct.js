import React from "react";
import { Sidebar, HeaderAdmin, EditProductMain } from "../../imports/index";
const EditProduct = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <HeaderAdmin />
        <EditProductMain />
      </main>
    </>
  );
};

export default EditProduct;
