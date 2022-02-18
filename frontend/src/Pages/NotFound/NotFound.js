import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../../imports/index";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="container my-5">
        <div className="row justify-content-center align-items-center">
          <h4 className="text-center mb-2 mb-sm-5">Page Not Found</h4>
          <img
            style={{ width: "100%", height: "300px", objectFit: "contain" }}
            src="/images/not-found.png"
            alt="Not-found"
          />
          <button
            className="col-md-3 col-sm-6 col-12 btn btn-success mt-5"
            onClick={() => navigate(-1)}
          >
            <span className="text-white text-decoration-none">Back Page</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
