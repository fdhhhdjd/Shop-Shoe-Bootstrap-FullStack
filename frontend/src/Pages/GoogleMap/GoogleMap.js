import React from "react";
import { ChakraProvider, theme } from "@chakra-ui/react";
import {
  Sidebar,
  HeaderAdmin,
  GoogleMapMain,
  MetaData,
} from "../../imports/index";

const GoogleMap = () => {
  return (
    <>
      <Sidebar />
      <MetaData title="Google-Map" />
      <main className="main-wrap">
        <HeaderAdmin />
        <ChakraProvider theme={theme}>
          <GoogleMapMain />
        </ChakraProvider>
      </main>
    </>
  );
};

export default GoogleMap;
