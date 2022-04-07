import lottie from "lottie-web";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
const Carousel = () => {
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
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
        >
          <ol className="carousel-indicators">
            {carousel.map((item, index) => {
              return (
                <>
                  <li
                    data-target="#carouselExampleIndicators"
                    data-slide-to={index}
                    className={index === 0 ? "active" : ""}
                  />
                </>
              );
            })}
          </ol>
          <div className="carousel-inner">
            {carousel.map((item, index) => {
              return (
                <>
                  <div className={`carousel-item ${index === 0 && "active"}`}>
                    <img
                      className="d-block w-100"
                      src={item.image && item.image.url}
                      alt="First slide"
                    />
                    <div className="carousel-caption d-none d-md-block ">
                      <h1>{item.heading}</h1>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </>
              );
            })}
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
        </div>
      )}
    </React.Fragment>
  );
};

export default Carousel;
