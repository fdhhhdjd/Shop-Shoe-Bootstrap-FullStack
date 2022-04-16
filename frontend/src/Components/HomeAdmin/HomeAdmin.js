import React from "react";
import {
  HeaderAdmin,
  MainHomeAdmin,
  Sidebar,
  MetaData,
} from "../../imports/index";
const HomeAdmin = () => {
  return (
    <>
      <Sidebar />
      <MetaData title="Dashboard Admin" />
      <main className="main-wrap">
        <HeaderAdmin />
        <MainHomeAdmin />
      </main>
    </>
  );
};

export default HomeAdmin;
