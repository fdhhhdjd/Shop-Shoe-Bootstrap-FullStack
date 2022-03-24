import lottie from "lottie-web";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
const Carousel = ({ handleScrollMenu }) => {
  const Scroll = useRef();
  const { Information } = useSelector((state) => ({ ...state.info }));
  useEffect(() => {
    lottie.loadAnimation({
      container: Scroll.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../utils/ScrollToTop.json"),
    });
  }, []);
  const carousel = Information && Information.carousels;

  return (
    <React.Fragment>
      {carousel && (
        <div className="container-fluid">
          <div
            id="myCarousel"
            className="carousel slide border"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              {carousel.map((item) => {
                return (
                  <>
                    <div className="carousel-item active">
                      <img
                        className="d-block w-100 "
                        src={item.image && item.image.url}
                        alt="Leopard"
                      />
                      <div className="carousel-caption d-none d-sm-block">
                        <h2>{item.heading}</h2>
                        <small>{item.description}</small>
                      </div>
                    </div>
                  </>
                );
              })}
              <a className="carousel-control-prev" onClick={handleScrollMenu}>
                <span className="sr-oy">
                  <div ref={Scroll}></div> Here
                </span>
              </a>

              <a
                className="carousel-control-prev"
                href="#myCarousel"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#myCarousel"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Carousel;
