import React from "react";
import { Loading1 } from "../../imports/Image";
import { LoadingStyle } from "../../Styles/LoadingStyle";
import MetaData from "../MetaData/MetaData";
const Loadings = () => {
  return (
    <React.Fragment>
      <MetaData title="Redirect ...." />
      <LoadingStyle>
        <div className=" loader-container">
          <img src={Loading1} alt="" />
        </div>
      </LoadingStyle>
    </React.Fragment>
  );
};

export default Loadings;
