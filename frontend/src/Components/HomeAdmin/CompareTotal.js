import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import { useSelector } from "react-redux";
const CompareTotal = () => {
  const { RevenueReceivedMonthBefore, RevenueReceivedEveryMonth } = useSelector(
    (state) => ({
      ...state.order,
    })
  );
  console.log(RevenueReceivedEveryMonth.data);
  return (
    <>
      <div className="row">
        {RevenueReceivedMonthBefore.data &&
          RevenueReceivedMonthBefore.data.map((item, index) => {
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
                        <i className="text-danger fa-arrow-down"></i>
                      </span>
                    )}

                    <div className="text">
                      <h6 className="mb-1">
                        {item && item._id ? item._id.month : item.compared}
                      </h6>
                      <span>
                        {item && item._id ? "$" : ""}
                        <CountUp
                          className="count"
                          start={0}
                          end={
                            item && item._id ? item.total_income : item.value
                          }
                          duration={5.75}
                          separator=","
                        />
                      </span>
                    </div>
                  </article>
                </div>
              </div>
            );
          })}

        {/* <div className="col-lg-4">
          <div className="card card-body mb-4 shadow-sm">
            <article className="icontext">
              <span className="icon icon-sm rounded-circle alert-success">
                <i className="text-success fas fa-bags-shopping"></i>
              </span>
              <div className="text">
                <h6 className="mb-1">Total Orders</h6>
                {orders ? (
                  <span>
                    <CountUp
                      className="count"
                      start={0}
                      end={orders.length}
                      duration={2.75}
                      separator=","
                    />
                  </span>
                ) : (
                  <span>0</span>
                )}
              </div>
            </article>
          </div>
        </div> */}
        {/* <div className="col-lg-4">
          <div className="card card-body mb-4 shadow-sm">
            <article className="icontext">
              <span className="icon icon-sm rounded-circle alert-warning">
                <i className="text-warning fas fa-shopping-basket"></i>
              </span>
              <div className="text">
                <h6 className="mb-1">Total Products</h6>
                {products ? (
                  <span>
                    <CountUp
                      className="count"
                      start={0}
                      end={products.length}
                      duration={1.75}
                      separator=","
                    />
                  </span>
                ) : (
                  <span>0</span>
                )}
              </div>
            </article>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default CompareTotal;
