import { lazy } from "react";
export const HomeAdmin = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(import("../Components/HomeAdmin/HomeAdmin")),
      1500
    );
  });
});
export const Home = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("../Pages/Home/Home")), 1800);
  });
});
export const RegisterGgFb = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(
      () => resolve(import("../Pages/Authentication/RegisterGgFb")),
      1800
    );
  });
});
