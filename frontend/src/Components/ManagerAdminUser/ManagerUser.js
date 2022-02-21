import React from "react";
import { Sidebar, HeaderAdmin, MainManagerUser } from "../../imports/index";
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
