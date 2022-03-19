import React from "react";
import { HeaderAdmin, MainEditOrderAdmin, Sidebar } from "../../imports/index";
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
