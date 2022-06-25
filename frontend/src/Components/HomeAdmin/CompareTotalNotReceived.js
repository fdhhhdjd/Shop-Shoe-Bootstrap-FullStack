import React from "react";
import CountUp from "react-countup";
import { useSelector } from "react-redux";
const CompareTotalNotReceived = () => {
  const { RevenueNotReceivedMonthBefore, RevenueReceivedEveryMonth } =
    useSelector((state) => ({
      ...state.order,
    }));
  return (
    <>
      {RevenueNotReceivedMonthBefore.status === 400 ? (
        <nav className="float-center mt-4" aria-label="Page navigation">
          <div className="card card-body mb-4 shadow-sm">
            <ul className="pagination  justify-content-center">
              <li className="page-item">
                <h1 style={{ color: "red" }}>
                  {RevenueNotReceivedMonthBefore.msg}
                </h1>
              </li>
            </ul>
          </div>
        </nav>
      ) : (
        <div className="row">
          {RevenueNotReceivedMonthBefore.data &&
            RevenueNotReceivedMonthBefore.data.map((item, index) => {
              return (
                <div className="col-lg-4" key={index}>
                  <div className="card card-body mb-4 shadow-sm">
                    <article className="icontext">
                      {item && item._id ? (
                        <span className="icon icon-sm rounded-circle alert-primary">
                          <i className="text-primary fas fa-usd-circle"></i>
                        </span>
                      ) : item.compared === "Increased" ? (
                        <span className="icon icon-sm rounded-circle alert-success">
                          <i className="text-success fa-solid fa-arrow-up"></i>
                        </span>
                      ) : (
                        <span className="icon icon-sm rounded-circle alert-danger">
                          <i className="text-danger fa-solid fa-arrow-down-long"></i>
                        </span>
                      )}

                      <div className="text">
                        <h6 className="mb-1">
                          {item && item._id ? item._id.month : item.compared}
                        </h6>
                        <span>
                          <CountUp
                            className="count"
                            start={0}
                            end={item && item._id ? item.total_income : 100}
                            duration={5.75}
                            separator=","
                          />
                          {item && item._id ? "$" : "%"}
                        </span>
                      </div>
                    </article>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default CompareTotalNotReceived;
