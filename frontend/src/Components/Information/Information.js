import React from "react";
import {
  HeaderAdmin,
  MainInformation,
  Sidebar,
  MetaData,
} from "../../imports/index";
const Information = () => {
  return (
    <>
      <Sidebar />
      <MetaData title="Manager-Info" />
      <main className="main-wrap">
        <HeaderAdmin />
        <MainInformation />
      </main>
    </>
  );
};

export default Information;
