import React from "react";
import { HeaderAdmin, MainInformation, Sidebar } from "../../imports/index";
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
