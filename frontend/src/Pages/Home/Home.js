import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CalltoActionSection,
  Carousel,
  ContactInfo,
  Footer,
  Header,
  MetaData,
  ShopSection,
} from "../../imports";
const Home = () => {
  const token = window.localStorage.getItem("firstLogin");
  const { refreshToken, CheckCreate } = useSelector((state) => ({
    ...state.data,
  }));
  const tokens = refreshToken.accessToken;
  const navigate = useNavigate();
  const menuRef = useRef();
  const handleScrollMenu = () => {
    menuRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const { profile } = useSelector((state) => ({
    ...state.data,
  }));
  useEffect(() => {
    if (profile?.user?.checkLogin === false) {
      navigate("/signing");
    }
  }, [profile?.user]);
  return (
    <>
      <>
        <MetaData title={`Home Page`} />
        {token ? "" : <Carousel handleScrollMenu={handleScrollMenu} />}
        <Header />
        <ShopSection ref={menuRef} />
        <CalltoActionSection />
        <ContactInfo />
        <Footer />
      </>
    </>
  );
};

export default Home;
