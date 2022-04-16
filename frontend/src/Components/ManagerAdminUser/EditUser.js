import React from "react";
import { HeaderAdmin, MainEditUser, Sidebar } from "../../imports/index";
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
