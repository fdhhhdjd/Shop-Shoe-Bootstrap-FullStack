import React from "react";
import { Sidebar, HeaderAdmin, FeedbackAdminMain } from "../../imports/index";

const FeedbackAdmin = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <HeaderAdmin />
        <FeedbackAdminMain />
      </main>
    </>
  );
};

export default FeedbackAdmin;
