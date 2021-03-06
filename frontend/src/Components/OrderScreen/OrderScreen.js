import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Header, Loading, MetaData } from "../../imports";
const OrderScreen = () => {
  const { order, loading } = useSelector((state) => ({ ...state.products }));

  const [orderItem, setOrderItem] = useState({});
  const [total, setTotal] = useState(0);
  const [quantitys, setQuantitys] = useState(0);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      order.history &&
        order.history.forEach((item) => {
          if (item._id === id) {
            setOrderItem(item);
            const getTotal = () => {
              const total = item.cart.reduce((prev, item) => {
                return prev + item.price * item.quantity;
              }, 0);

              setTotal(total);
            };
            getTotal();
          }
        });
    }
  }, [id]);
  useEffect(() => {
    if (id) {
      order.history &&
        order.history.forEach((item) => {
          if (item._id === id) {
            setOrderItem(item);
            const getTotal = () => {
              const total = item.cart.reduce((prev, item) => {
                return prev + item.quantity;
              }, 0);

              setQuantitys(total);
            };
            getTotal();
          }
        });
    }
  }, [id]);
  return (
    <>
      <Header />
      <MetaData title={`Order Detail - ${orderItem._id}`} />

      <div className="container">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="row  order-detail">
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-user"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Customer</strong>
                    </h5>
                    <p>{orderItem.name}</p>
                    <p>
                      <a href={`mailto:${orderItem.email}`}>
                        {orderItem.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              {/* 2 */}
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-truck-moving"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Order info</strong>
                    </h5>
                    <p>
                      Shipping:
                      {orderItem.address && orderItem.address.country_code}
                    </p>
                    <p>Pay method: {orderItem && orderItem.paymentID}</p>
                    {orderItem.status ? (
                      <div className="bg-info p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Paid on {moment(orderItem.createdAt).calendar()}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-danger p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Not Paid
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Deliver to</strong>
                    </h5>
                    <p>
                      Address: {orderItem.address && orderItem.address.city},
                      {orderItem.address && orderItem.address.line1},
                      {orderItem.address && orderItem.address.postal_code}
                      {orderItem.address && orderItem.address.state}
                    </p>
                    {orderItem.status ? (
                      <div className="bg-info p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Delivered on {moment(orderItem.createdAt).calendar()}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-danger p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Not Delivered
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* aa */}
            <div className="row order-products justify-content-between">
              {orderItem.cart &&
                orderItem.cart.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      <div className="col-lg-8">
                        <>
                          <div className="order-product row" key={index}>
                            <div className="col-md-3 col-6">
                              <img src={item.image.url} alt={item.name} />
                            </div>
                            <div className="col-md-5 col-6 d-flex align-items-center">
                              <Link to={`/products/${item.product}`}>
                                <h6>{item.name}</h6>
                              </Link>
                            </div>
                            <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                              <h4>QUANTITY</h4>
                              <h6>{item.quantity}</h6>
                            </div>
                            <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                              <h4>SUBTOTAL</h4>
                              <h6>${item.quantity * item.price}</h6>
                            </div>
                          </div>
                        </>
                      </div>
                    </Fragment>
                  );
                })}
              {orderItem.cart && (
                <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <td>
                          <strong>Products</strong>
                        </td>
                        <td>{orderItem.cart.length}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Shipping</strong>
                        </td>
                        {orderItem.status ? <td>Paid on</td> : <td>Paid in</td>}
                      </tr>
                      <tr>
                        <td>
                          <strong>Shipping</strong>
                        </td>
                        <td>
                          {(orderItem.order_status === "Delivered" && (
                            <span className="badge btn-success">Delivered</span>
                          )) ||
                            (orderItem.order_status === "On Delivery" && (
                              <span className="badge btn-warning">
                                On Delivery
                              </span>
                            )) ||
                            (orderItem.order_status === "Ordered" && (
                              <span className="badge btn-danger">Ordered</span>
                            ))}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Quantity</strong>
                        </td>
                        <td>{quantitys}</td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Sale Code Voucher</strong>
                        </td>

                        {orderItem.voucher === 0 ? (
                          <td>No Voucher</td>
                        ) : (
                          <td>{orderItem.voucher} %</td>
                        )}
                      </tr>
                      <tr>
                        <td>
                          <strong>Cost</strong>
                        </td>
                        {orderItem.voucher === 0 ? (
                          <td>$ {orderItem.cost}</td>
                        ) : (
                          <del style={{ color: "red" }}>
                            <td>$ {orderItem.cost}</td>
                          </del>
                        )}
                      </tr>
                      <tr>
                        <td>
                          <strong>Total </strong>
                        </td>
                        {orderItem.voucher === 0 ? (
                          <td>$ {orderItem.cart && orderItem.cost}</td>
                        ) : (
                          <td style={{ color: "green" }}>
                            $ {orderItem.cart && orderItem.total}
                          </td>
                        )}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderScreen;
