import React from "react";
import { Sidebar, HeaderAdmin, MainManagerAdmin } from "../../imports/index";
const ManagerAdmin = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <HeaderAdmin />
        <MainManagerAdmin />
      </main>
    </>
  );
};

export default ManagerAdmin;
