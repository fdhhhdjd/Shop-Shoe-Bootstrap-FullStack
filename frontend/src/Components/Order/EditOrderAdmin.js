import React from "react";
import { Sidebar, HeaderAdmin, MainEditOrderAdmin } from "../../imports/index";
const EditOrderAdmin = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <HeaderAdmin />
        <MainEditOrderAdmin />
      </main>
    </>
  );
};

export default EditOrderAdmin;
