import React from "react";
import { HeaderAdmin, MainCategories, Sidebar } from "../../imports/index";
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
