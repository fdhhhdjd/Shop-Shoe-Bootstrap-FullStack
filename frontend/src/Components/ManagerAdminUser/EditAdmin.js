import React from "react";
import { Sidebar, HeaderAdmin, MainEditAdmin } from "../../imports/index";
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
