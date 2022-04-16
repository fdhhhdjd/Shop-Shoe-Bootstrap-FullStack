import React from "react";
import { HeaderAdmin, MainCreateEditInfo, Sidebar } from "../../imports/index";
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
