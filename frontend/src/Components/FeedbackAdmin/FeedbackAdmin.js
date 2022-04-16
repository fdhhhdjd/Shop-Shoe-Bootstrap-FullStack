import React from "react";
import {
  Sidebar,
  HeaderAdmin,
  FeedbackAdminMain,
  MetaData,
} from "../../imports/index";

const FeedbackAdmin = () => {
  return (
    <>
      <Sidebar />
      <MetaData title="Manager-Feedback-Customer" />
      <main className="main-wrap">
        <HeaderAdmin />
        <FeedbackAdminMain />
      </main>
    </>
  );
};

export default FeedbackAdmin;
