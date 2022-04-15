import React from "react";
import {
  HeaderAdmin,
  MainManagerAdmin,
  Sidebar,
  MetaData,
} from "../../imports/index";
const ManagerAdmin = () => {
  return (
    <>
      <Sidebar />
      <MetaData title="Manager-Account-Admin" />

      <main className="main-wrap">
        <HeaderAdmin />
        <MainManagerAdmin />
      </main>
    </>
  );
};

export default ManagerAdmin;
