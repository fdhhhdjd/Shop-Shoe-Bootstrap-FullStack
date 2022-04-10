import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import { Loadings, NotFound, ScrollTop } from "./imports/index";
import "./responsive.css";
import RoutesDataAdmin from "./utils/RoutesAdmin";
import RoutesDataUser from "./utils/RoutesUser";
function App() {
  return (
    <>
      <Suspense fallback={<Loadings />}>
        <ToastContainer position="top-center" />
        <ScrollTop />
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
