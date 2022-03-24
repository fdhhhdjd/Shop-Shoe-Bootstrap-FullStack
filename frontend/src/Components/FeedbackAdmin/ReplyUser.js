import React from "react";
import { Sidebar, HeaderAdmin, ReplyUserMain } from "../../imports/index";

const ReplyUser = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <HeaderAdmin />
        <ReplyUserMain />
      </main>
    </>
  );
};

export default ReplyUser;
