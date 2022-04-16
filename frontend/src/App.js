import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { Loadings, NotFound, ScrollTop } from "./imports/index";
import "./responsive.css";
import RoutesDataAdmin from "./utils/RoutesAdmin";
import RoutesDataUser from "./utils/RoutesUser";
import { Detector } from "react-detect-offline";
import Swal from "sweetalert2";
function App() {
  const connectInternet = useCallback((online) => {
    if (online === false) {
      Swal.fire(
        "The Internet?",
        "No Internet,Please Connection Network",
        "question"
      );
      return setTimeout(() => {
        window.location.reload(false);
      }, [5000]);
    }
  }, []);
  useEffect(() => {
    connectInternet();
  }, [connectInternet]);

  return (
    <>
      <Suspense fallback={<Loadings />}>
        <ToastContainer position="top-center" />
        <ScrollTop />
        <Detector
          render={({ online }) => <div onClick={connectInternet(online)}></div>}
        />
        <Routes>
          {/* User */}
          {RoutesDataUser.map((item, key) => {
            return (
              <React.Fragment key={key}>
                {item.private === null ? (
                  <Route path={`/${item.path}`} element={item.main} />
                ) : (
                  <Route element={item.private}>
                    <Route path={`/${item.path}`} element={item.main} />
                  </Route>
                )}
              </React.Fragment>
            );
          })}
          {/* Admin */}
          {RoutesDataAdmin.map((item, key) => {
            return (
              <React.Fragment key={key}>
                <Route element={item.private}>
                  <Route path={`/${item.path}`} element={item.main} />
                </Route>
              </React.Fragment>
            );
          })}
          {/* Route Share */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
