import React from "react";
import { Sidebar, HeaderAdmin, MainCategories } from "../../imports/index";
const Categories = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <HeaderAdmin />
        <MainCategories />
      </main>
    </>
  );
};

export default Categories;
