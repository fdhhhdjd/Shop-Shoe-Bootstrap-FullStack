import React from "react";
import { HeaderAdmin, MainHomeAdmin, Sidebar } from "../../imports/index";
const HomeAdmin = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <HeaderAdmin />
        <MainHomeAdmin />
      </main>
    </>
  );
};

export default HomeAdmin;
