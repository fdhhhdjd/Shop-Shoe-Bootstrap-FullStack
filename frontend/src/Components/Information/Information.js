import React from "react";
import { Sidebar, HeaderAdmin, MainInformation } from "../../imports/index";
const Information = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <HeaderAdmin />
        <MainInformation />
      </main>
    </>
  );
};

export default Information;
