import React, { useRef } from "react";
import {
  CalltoActionSection,
  Carousel,
  ContactInfo,
  Footer,
  Header,
  ShopSection,
  MetaData,
} from "../../imports";

const Home = () => {
  const token = window.localStorage.getItem("firstLogin");
  const menuRef = useRef();

  const handleScrollMenu = () => {
    menuRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <MetaData title={`Home Page`} />
      {token ? "" : <Carousel handleScrollMenu={handleScrollMenu} />}
      <Header />
      <ShopSection ref={menuRef} />
      <CalltoActionSection />
      <ContactInfo />
      <Footer />
    </>
  );
};

export default Home;
