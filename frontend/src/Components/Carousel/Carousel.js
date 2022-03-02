import React, { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
const Carousel = ({ handleScrollMenu }) => {
  const Scroll = useRef();

  useEffect(() => {
    lottie.loadAnimation({
      container: Scroll.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../utils/ScrollToTop.json"),
    });
  }, []);
  return (
    <>
      <div className="container-fluid ">
        <div className="row">
          {/* slider banner	 */}
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to={0}
                className="active"
              />
              <li data-target="#carouselExampleIndicators" data-slide-to={1} />
              <li data-target="#carouselExampleIndicators" data-slide-to={2} />
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="info">
                  <h1>SLIDE ONE</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <div className="info">
                  <h1>SLIDE TWO</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                  </p>
                </div>
              </div>
              <div className="carousel-item">
                <div className="info">
                  <h1>SLIDE THREE</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                  </p>
                </div>
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
            <a className="carousel-control-prev" onClick={handleScrollMenu}>
              <span className="sr-oy">
                <div ref={Scroll}></div> Here
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;
