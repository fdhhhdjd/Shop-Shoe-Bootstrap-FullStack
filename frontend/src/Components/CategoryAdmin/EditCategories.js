import React from "react";
import { Sidebar, HeaderAdmin, MainEditCategories } from "../../imports/index";
const EditCategories = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <HeaderAdmin />
        <MainEditCategories />
      </main>
    </>
  );
};

export default EditCategories;
