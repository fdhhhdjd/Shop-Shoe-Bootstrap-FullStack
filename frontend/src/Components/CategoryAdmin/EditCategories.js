import React from "react";
import { HeaderAdmin, MainEditCategories, Sidebar } from "../../imports/index";
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
