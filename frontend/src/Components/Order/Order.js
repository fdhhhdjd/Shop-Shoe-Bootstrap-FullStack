import React from "react";
import { Loading } from "../../imports";
import Message from "../../Pages/Error/Message";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
const History = ({ cartItems }) => {
  const { loading, order, error } = useSelector((state) => ({
    ...state.products,
  }));
  const orders = order.history;

  return (
    <>
      <div className=" d-flex justify-content-center align-items-center flex-column">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div></div>
            {orders && orders.length === 0 ? (
              <div className="col-12 alert alert-info text-center mt-3">
                No Orders
                <Link
                  className="btn btn-success mx-2 px-3 py-2"
                  to="/"
                  style={{
                    fontSize: "12px",
                  }}
                >
                  START SHOPPING
                </Link>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>STATUS</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders &&
                      orders.map((order) => (
                        <tr
                          className={`${
                            order.status ? "alert-success" : "alert-danger"
                          }`}
                          key={order._id}
                        >
                          <td>
                            <Link to={`/order/${order._id}`} className="link">
                              {order._id}
                            </Link>
                          </td>
                          <td>{order.status ? <>Paid</> : <>Not Paid</>}</td>
                          <td>
                            {order.isPaid
                              ? moment(order.paidAt).calendar()
                              : moment(order.createdAt).calendar()}
                          </td>
                          <td>${cartItems}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default History;
