import React from "react";
import { Route, Navigate, Outlet, useLocation } from "react-router-dom";

function PrivateRouter({ element: Element, ...rest }) {
  const location = useLocation();
  const token = window.localStorage.getItem("firstLogin");
  return (
    <>
      {token ? (
        <Outlet />
      ) : (
        <Navigate to="/login" replace state={{ from: location }} />
      )}
    </>
  );
}

export default PrivateRouter;
