import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { Loading } from "../../imports/index";
import Message from "../../Pages/Error/Message";

const LatestOrder = (props) => {
  const { loading, error, orders } = props;
  return (
    <div className="card-body">
      <h4 className="card-title">New orders</h4>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <tbody>
              {orders &&
                orders.slice(0, 5).map((order) => (
                  <tr key={order._id}>
                    <td>
                      <b>{order.name}</b>
                    </td>
                    <td>{order.email}</td>
                    <td>${order.total}</td>
                    <td>
                      {order.status ? (
                        <span className="badge rounded-pill alert-success">
                          Paid At {moment(order.updatedAt).format("MMM Do YY")}
                        </span>
                      ) : (
                        <span className="badge rounded-pill alert-danger">
                          Not Paid
                        </span>
                      )}
                    </td>
                    <td>{moment(order.createdAt).calendar()}</td>
                    <td className="d-flex justify-content-end align-item-center">
                      <Link to={`/order/${order._id}`} className="text-success">
                        <i className="fas fa-eye"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LatestOrder;
