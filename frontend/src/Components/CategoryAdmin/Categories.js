import React from "react";
import {
  HeaderAdmin,
  MainCategories,
  Sidebar,
  MetaData,
} from "../../imports/index";
const Categories = () => {
  return (
    <>
      <Sidebar />
      <MetaData title="Category-Product" />

      <main className="main-wrap">
        <HeaderAdmin />
        <MainCategories />
      </main>
    </>
  );
};

export default Categories;
