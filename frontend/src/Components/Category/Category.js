import React from "react";
import { Sidebar, HeaderAdmin, CategoryMain } from "../../imports/index";
const Category = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <HeaderAdmin />
        <CategoryMain />
      </main>
    </>
  );
};

export default Category;
