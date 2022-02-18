import React from "react";
import { HeaderAdmin, Sidebar, ProfileAdmin } from "../../imports/index";
const ProfileAdmins = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <HeaderAdmin />
        <ProfileAdmin />
      </main>
    </>
  );
};

export default ProfileAdmins;
