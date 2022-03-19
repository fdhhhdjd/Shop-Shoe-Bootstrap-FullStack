import moment from "moment";
import React, { useState } from "react";
import CountUp from "react-countup";
import { Link } from "react-router-dom";
import { Loading } from "../../imports/index";
import Message from "../../Pages/Error/Message";
const LatestOrder = (props) => {
  const { loading, error, orders } = props;
  const [visible, setVisible] = useState(3);
  const handleLoadMore = () => {
    setVisible((e) => e + 3);
  };
  return (
    <div className="card-body">
      <h4 className="card-title">New Orders</h4>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          {orders && orders.length === 0 ? (
            <nav className="float-center mt-4" aria-label="Page navigation">
              <ul className="pagination  justify-content-center">
                <li className="page-item">
                  <h1 style={{ color: "red" }}>Oder Empty</h1>
                </li>
              </ul>
            </nav>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <tbody>
                  {orders &&
                    orders.slice(0, visible).map((order) => (
                      <tr key={order._id}>
                        <td>
                          <div className="col-md-4 px-4">
                            {order.user_id && order.user_id.image && (
                              <img
                                src={order.user_id.image.url}
                                alt=""
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                }}
                              />
                            )}
                          </div>
                        </td>
                        <td>
                          <b>
                            {order.user_id &&
                              order.user_id.name &&
                              order.user_id.name}
                          </b>
                        </td>
                        <td>{order.email}</td>
                        <td>
                          $
                          <CountUp
                            className="count"
                            start={0}
                            end={order.voucher === 0 ? order.cost : order.total}
                            duration={3.5}
                            separator=","
                          />
                        </td>
                        <td>
                          {order.status ? (
                            <span className="badge rounded-pill alert-success">
                              Paid At{" "}
                              {moment(order.updatedAt).format("MMM Do YY")}
                            </span>
                          ) : (
                            <span className="badge rounded-pill alert-danger">
                              Not Paid
                            </span>
                          )}
                        </td>
                        <td>
                          {(order.order_status === "Delivered" && (
                            <span className="badge btn-success">Delivered</span>
                          )) ||
                            (order.order_status === "On Delivery" && (
                              <span className="badge btn-warning">
                                On Delivery
                              </span>
                            )) ||
                            (order.order_status === "Ordered" && (
                              <span className="badge btn-danger">Ordered</span>
                            ))}
                        </td>
                        <td>{moment(order.createdAt).calendar()}</td>
                        <td className="d-flex justify-content-end align-item-center">
                          <Link
                            to={`/orders/${order._id}`}
                            className="text-success"
                          >
                            <i className="fas fa-eye"></i>
                          </Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <nav className="float-center mt-4" aria-label="Page navigation">
                <ul className="pagination  justify-content-center">
                  <li className="page-item">
                    {orders && visible < orders.length && (
                      <button className="page-link" onClick={handleLoadMore}>
                        Load More <i className="fa-solid fa-angle-down"></i>
                      </button>
                    )}
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LatestOrder;
