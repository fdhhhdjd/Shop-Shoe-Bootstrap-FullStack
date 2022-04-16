import React from "react";
import { Link } from "react-router-dom";

const OrderDetailProducts = (props) => {
  const { order, loading } = props;

  return (
    <table className="table border table-lg">
      <thead>
        <tr>
          <th style={{ width: "40%" }}>Product</th>
          <th style={{ width: "20%" }}>Unit Price</th>
          <th style={{ width: "20%" }}>Quantity</th>
          <th style={{ width: "20%" }} className="text-end">
            Total
          </th>
        </tr>
      </thead>
      <tbody>
        {order.cart.map((item, index) => (
          <tr key={item._id}>
            <td>
              <Link className="itemside" to="#">
                <div className="left">
                  <img
                    src={item.image.url}
                    alt={item.name}
                    style={{ width: "40px", height: "40px" }}
                    className="img-xs"
                  />
                </div>
                <div className="info">{item.name}</div>
              </Link>
            </td>
            <td>${item.price} </td>
            <td>{item.quantity} </td>
            <td className="text-end"> ${item.quantity * item.price}</td>
          </tr>
        ))}

        <tr>
          <td colSpan="4">
            <article className="float-end">
              <dl className="dlist">
                <dt>Subtotal:</dt>{" "}
                {order.voucher === 0 ? (
                  <dd>${order.cost.toFixed(2)}</dd>
                ) : (
                  <dd style={{ color: "green" }}>${order.total.toFixed(2)}</dd>
                )}
              </dl>
              <dl className="dlist">
                <dt>Shipping cost:</dt>{" "}
                {order.voucher === 0 ? (
                  <dd>${order.cost.toFixed(2)}</dd>
                ) : (
                  <dd style={{ color: "red" }}>
                    <del>${order.cost.toFixed(2)}</del>
                  </dd>
                )}
              </dl>
              <dl className="dlist">
                <dt>Self Voucher :</dt>{" "}
                {order.voucher === 0 ? (
                  <dd>No Voucher</dd>
                ) : (
                  <dd>{order.voucher} %</dd>
                )}
              </dl>
              <dl className="dlist">
                <dt>Status Bill:</dt>
                <dd>
                  {(order.order_status === "Delivered" && (
                    <span className="badge btn-success">Delivered</span>
                  )) ||
                    (order.order_status === "On Delivery" && (
                      <span className="badge btn-warning">On Delivery</span>
                    )) ||
                    (order.order_status === "Ordered" && (
                      <span className="badge btn-danger">Ordered</span>
                    ))}
                </dd>
              </dl>
              <dl className="dlist">
                <dt className="text-muted">Status:</dt>
                <dd>
                  {order.status ? (
                    <span className="badge rounded-pill alert alert-success text-success">
                      Payment done
                    </span>
                  ) : (
                    <span className="badge rounded-pill alert alert-danger text-danger">
                      Not Paid
                    </span>
                  )}
                </dd>
              </dl>
            </article>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default OrderDetailProducts;
