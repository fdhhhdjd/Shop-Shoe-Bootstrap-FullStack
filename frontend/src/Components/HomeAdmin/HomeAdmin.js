import React from "react";
import { HeaderAdmin, Sidebar, MainHomeAdmin } from "../../imports/index";
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
