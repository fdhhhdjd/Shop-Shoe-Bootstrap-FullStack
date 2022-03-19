import React from "react";
import { HeaderAdmin, MainManagerAdmin, Sidebar } from "../../imports/index";
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
