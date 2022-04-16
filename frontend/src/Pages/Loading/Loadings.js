import React from "react";
import { Loading1 } from "../../imports/Image";
import { LoadingStyle } from "../../Styles/LoadingStyle";
const Loadings = () => {
  return (
    <LoadingStyle>
      <div className=" loader-container">
        <img src={Loading1} alt="" />
      </div>
    </LoadingStyle>
  );
};

export default Loadings;
