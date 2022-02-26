import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import CountUp from "react-countup";
const Orders = (props) => {
  const { orders, visible, search } = props;
  return (
    <>
      {orders.length === 0 ? (
        <nav className="float-center mt-4" aria-label="Page navigation">
          <ul className="pagination  justify-content-center">
            <li className="page-item">
              <h1 style={{ color: "red" }}>Oder Empty</h1>
            </li>
          </ul>
        </nav>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Total</th>
              <th scope="col">Paid</th>
              <th scope="col">Date</th>
              <th>Status</th>
              <th scope="col" className="text-end">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders
              .slice(0, visible)
              .filter((value) => {
                if (search === "") {
                  return value;
                } else if (
                  value.name.toLowerCase().includes(search.toLowerCase()) ||
                  value.email.toLowerCase().includes(search.toLowerCase())
                ) {
                  return value;
                }
              })
              .map((order) => (
                <tr key={order._id}>
                  <td>
                    {order.user_id && order.user_id.image && (
                      <img
                        src={order.user_id.image.url}
                        alt=""
                        style={{
                          width: "25px",
                          height: "25px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </td>
                  <td>
                    <b>{order.name}</b>
                  </td>
                  <td>{order.email}</td>
                  <td>
                    $
                    <CountUp
                      className="count"
                      start={0}
                      end={order.total}
                      duration={2.5}
                      separator=","
                    />
                  </td>
                  <td>
                    {order.status ? (
                      <span className="badge rounded-pill alert-success">
                        Paid At {moment(order.createdAt).format("MMM Do YY")}
                      </span>
                    ) : (
                      <span className="badge rounded-pill alert-danger">
                        Not Paid
                      </span>
                    )}
                  </td>
                  <td>{moment(order.createdAt).format("MMM Do YY")}</td>
                  <td>
                    {(order.order_status === "Delivered" && (
                      <span className="badge btn-success">Delivered</span>
                    )) ||
                      (order.order_status === "On Delivery" && (
                        <span className="badge btn-warning">On Delivery</span>
                      )) ||
                      (order.order_status === "Ordered" && (
                        <span className="badge btn-danger">Ordered</span>
                      ))}
                  </td>

                  <td className="d-flex justify-content-end align-item-center">
                    <Link
                      to={`/editOrders/${order._id}`}
                      className="text-success"
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </Link>
                    &nbsp;&nbsp;
                    <Link to={`/orders/${order._id}`} className="text-success">
                      <i className="fas fa-eye"></i>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Orders;
