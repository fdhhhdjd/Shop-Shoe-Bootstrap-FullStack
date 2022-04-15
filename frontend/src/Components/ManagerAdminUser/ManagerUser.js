import React from "react";
import {
  HeaderAdmin,
  MainManagerUser,
  Sidebar,
  MetaData,
} from "../../imports/index";
const ManagerUser = () => {
  return (
    <>
      <Sidebar />
      <MetaData title="Manager-Account-Customer" />
      <main className="main-wrap">
        <HeaderAdmin />
        <MainManagerUser />
      </main>
    </>
  );
};

export default ManagerUser;
