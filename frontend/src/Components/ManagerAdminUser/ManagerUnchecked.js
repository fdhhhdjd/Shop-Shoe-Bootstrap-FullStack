import React from "react";
import {
  HeaderAdmin,
  ManagerUncheckedMain,
  Sidebar,
} from "../../imports/index";
const ManagerUnchecked = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <HeaderAdmin />
        <ManagerUncheckedMain />
      </main>
    </>
  );
};

export default ManagerUnchecked;
