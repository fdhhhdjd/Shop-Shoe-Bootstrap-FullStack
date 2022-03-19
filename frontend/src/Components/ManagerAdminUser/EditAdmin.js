import React from "react";
import { HeaderAdmin, MainEditAdmin, Sidebar } from "../../imports/index";
const EditAdmin = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <HeaderAdmin />
        <MainEditAdmin />
      </main>
    </>
  );
};

export default EditAdmin;
