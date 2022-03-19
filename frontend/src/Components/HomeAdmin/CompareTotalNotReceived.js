import React from "react";
import CountUp from "react-countup";
import { useSelector } from "react-redux";
const CompareTotalNotReceived = () => {
  const { RevenueNotReceivedMonthBefore } = useSelector((state) => ({
    ...state.order,
  }));
  console.log(RevenueNotReceivedMonthBefore, "demo");
  return (
    <>
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
                          end={
                            item && item._id ? item.total_income : item.value
                          }
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
    </>
  );
};

export default CompareTotalNotReceived;
