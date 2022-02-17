import React from "react";
import { LoadingStyle } from "../../Styles/LoadingStyle";
import { Loading1 } from "../../imports/Image";
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
