import React from "react";
import { car, Loading1 } from "../../imports/Image";
import { LoadingStyle } from "../../Styles/LoadingStyle";
import MetaData from "../MetaData/MetaData";
const Loadings = () => {
  const tokenAdmin = window.localStorage.getItem("firstLoginAdmin");
  return (
    <React.Fragment>
      <MetaData title="Redirect ...." />
      <LoadingStyle>
        <div className=" loader-container">
          {tokenAdmin ? (
            <img src={Loading1} alt="" />
          ) : (
            <img src={car} alt="" />
          )}
        </div>
      </LoadingStyle>
    </React.Fragment>
  );
};

export default Loadings;
