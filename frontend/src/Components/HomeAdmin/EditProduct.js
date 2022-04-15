import React from "react";
import { EditProductMain, HeaderAdmin, Sidebar } from "../../imports/index";
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
