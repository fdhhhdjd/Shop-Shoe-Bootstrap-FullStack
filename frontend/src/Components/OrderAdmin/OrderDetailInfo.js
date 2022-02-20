import React from "react";
import { useSelector } from "react-redux";

const OrderDetailInfo = (props) => {
  const { detailOrder, loading, error } = useSelector((state) => ({
    ...state.order,
  }));
  const { order } = props;
  return (
    <>
      {detailOrder.Payment && (
        <div className="row mb-5 order-info-wrap">
          <div className="col-md-6 col-lg-4">
            <article className="icontext align-items-start">
              <span className="icon icon-sm rounded-circle alert-success">
                <i className="text-success fas fa-user"></i>
              </span>
              <div className="text">
                <h6 className="mb-1">Customer</h6>
                <p className="mb-1">
                  {order.name} <br />
                  <a href={`mailto:${order.email}`}>{order.email}</a>
                </p>
              </div>
            </article>
          </div>
          <div className="col-md-6 col-lg-4">
            <article className="icontext align-items-start">
              <span className="icon icon-sm rounded-circle alert-success">
                <i className="text-success fas fa-truck-moving"></i>
              </span>
              <div className="text">
                <h6 className="mb-1">Order info</h6>
                <p className="mb-1">
                  Shipping: {order.address && order.address.country_code} <br />{" "}
                  Pay method: {order && order.paymentID}
                </p>
              </div>
            </article>
          </div>
          <div className="col-md-6 col-lg-4">
            <article className="icontext align-items-start">
              <span className="icon icon-sm rounded-circle alert-success">
                <i className="text-success fas fa-map-marker-alt"></i>
              </span>
              <div className="text">
                <h6 className="mb-1">Deliver to</h6>
                <p className="mb-1">
                  Address: {order.address && order.address.city}
                  <br />
                  {order.address && order.address.line1},
                  {order.address && order.address.postal_code}
                  {order.address && order.address.state}
                  {/* <br /> {order.shippingAddress.postalCode} */}
                </p>
              </div>
            </article>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetailInfo;
