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
    setTimeout(() => resolve(import("../Pages/Home/Home")), 1500);
  });
});
