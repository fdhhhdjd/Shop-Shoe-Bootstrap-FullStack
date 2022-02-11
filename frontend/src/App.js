import React, { Suspense } from "react";
import "./App.css";
import "./responsive.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  Login,
  NotFound,
  Loading,
  Register,
  Home,
  Forget,
  Reset,
  Profile,
} from "./imports/index";
import PrivateRouter from "./Pages/PrivateRouter/PrivateRouter";
function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <ToastContainer position="top-center" />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/password/reset/:token" element={<Reset />} />
          <Route element={<PrivateRouter />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
