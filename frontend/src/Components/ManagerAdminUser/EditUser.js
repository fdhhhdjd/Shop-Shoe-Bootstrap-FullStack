import React from "react";
import { Sidebar, HeaderAdmin, MainEditUser } from "../../imports/index";
const EditUser = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <HeaderAdmin />
        <MainEditUser />
      </main>
    </>
  );
};

export default EditUser;
