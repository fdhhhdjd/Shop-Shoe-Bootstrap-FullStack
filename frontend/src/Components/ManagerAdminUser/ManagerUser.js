import React from "react";
import { HeaderAdmin, MainManagerUser, Sidebar } from "../../imports/index";
const ManagerUser = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <HeaderAdmin />
        <MainManagerUser />
      </main>
    </>
  );
};

export default ManagerUser;
