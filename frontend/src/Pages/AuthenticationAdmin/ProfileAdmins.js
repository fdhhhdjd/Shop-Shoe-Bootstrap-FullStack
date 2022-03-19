import React from "react";
import { HeaderAdmin, ProfileAdmin, Sidebar } from "../../imports/index";
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
