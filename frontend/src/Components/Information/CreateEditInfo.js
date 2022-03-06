import React from "react";
import { Sidebar, HeaderAdmin, MainCreateEditInfo } from "../../imports/index";
const CreateEditInfo = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <HeaderAdmin />
        <MainCreateEditInfo />
      </main>
    </>
  );
};

export default CreateEditInfo;
