import React from "react";
import CountUp from "react-countup";
const TopTotal = (props) => {
  const { orders, products } = props;
  let totalSale = 0;
  if (orders) {
    orders.map((order) =>
      order.isPaid === true ? (totalSale = totalSale + order.totalPrice) : null
    );
  }
  if (orders) {
    orders.map((order) => console.log(order));
  }
  return (
    <div className="row">
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-primary">
              <i className="text-primary fas fa-usd-circle"></i>
            </span>
            <div className="text">
              <h6 className="mb-1">Total Sales</h6>{" "}
              <span>
                $
                <CountUp
                  className="count"
                  start={0}
                  end={totalSale.toFixed(0)}
                  duration={5.75}
                  separator=","
                />
              </span>
            </div>
          </article>
        </div>
      </div>
      <div className="col-lg-4">
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
      </div>
      <div className="col-lg-4">
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
      </div>
    </div>
  );
};

export default TopTotal;
