import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Loading, OrderDetailInfo, OrderDetailProducts } from "../../imports";

const OrderDetailMain = () => {
  const { detailOrder, loading, error } = useSelector((state) => ({
    ...state.order,
  }));

  const order = detailOrder.Payment && detailOrder.Payment;
  return (
    <>
      {detailOrder.Payment && (
        <section className="content-main">
          <div className="content-header">
            <Link to="/orders" className="btn btn-dark text-white">
              Back To Orders
            </Link>
          </div>
          {loading ? (
            <Loading />
          ) : (
            <div className="card">
              <header className="card-header p-3 Header-green">
                <div className="row align-items-center ">
                  <div className="col-lg-6 col-md-6">
                    <span>
                      <i className="far fa-calendar-alt mx-2"></i>
                      <b className="text-white">
                        {moment(order.createdAt).format("llll")}
                      </b>
                    </span>
                    <br />
                    <small className="text-white mx-3 ">
                      Order ID: {order._id}
                    </small>
                  </div>
                  <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center">
                    <select
                      className="form-select d-inline-block"
                      style={{ maxWidth: "200px" }}
                    >
                      <option>Change status</option>
                      <option>Awaiting payment</option>
                      <option>Confirmed</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                    </select>
                    <Link className="btn btn-success ms-2" to="#">
                      <i className="fas fa-print"></i>
                    </Link>
                  </div>
                </div>
              </header>
              <div className="card-body">
                {/* Order info */}
                <OrderDetailInfo order={order} />

                <div className="row">
                  <div className="col-lg-9">
                    <div className="table-responsive">
                      <OrderDetailProducts order={order} loading={loading} />
                    </div>
                  </div>
                  {/* Payment Info */}
                  <div className="col-lg-3">
                    <div className="box shadow-sm bg-light">
                      {order.status ? (
                        // <button className="btn btn-success col-12">
                        //   DELIVERED AT ({" "}
                        //   {moment(order.isDeliveredAt).format("MMM Do YY")})
                        // </button>
                        <td>
                          {(order.order_status === "Delivered" && (
                            <button className="btn btn-success col-12">
                              DELIVERED AT ({" "}
                              {moment(order.isDeliveredAt).format("MMM Do YY")})
                            </button>
                          )) ||
                            (order.order_status === "On Delivery" && (
                              <button className="btn btn-warning col-12">
                                On Delivery ({" "}
                                {moment(order.isDeliveredAt).format(
                                  "MMM Do YY"
                                )}
                                )
                              </button>
                            )) ||
                            (order.order_status === "Ordered" && (
                              <button className="btn btn-danger col-12">
                                On Delivery
                                {moment(order.isDeliveredAt).format(
                                  "MMM Do YY"
                                )}
                                )
                              </button>
                            ))}
                        </td>
                      ) : (
                        <>
                          {loading && <Loading />}
                          <button className="btn btn-dark col-12">
                            MARK AS DELIVERED
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default OrderDetailMain;
