import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import CountUp from "react-countup";
const Admins = (props) => {
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
              <th scope="col">Role</th>
              <th scope="col">Sex</th>
              <th scope="col">Date</th>
              <th scope="col">Phone</th>
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
                    {order && order.image && (
                      <img
                        src={order.image.url}
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
                  <td>{order.role === 1 && "Admin"}</td>
                  <td>
                    {(order.sex === 1 && "Man") ||
                      (order.sex === 0 && "Women") ||
                      (order.sex == undefined && (
                        <b className="text-danger">No Gender</b>
                      ))}
                  </td>
                  <td>
                    {(order.date_of_birth == undefined && (
                      <b className="text-danger">No Date</b>
                    )) ||
                      moment(order.date_of_birth).format("MMM Do YY")}
                  </td>
                  <td>
                    {order.phone_number ||
                      (order.phone_number == undefined && (
                        <b className="text-danger">No Phone</b>
                      ))}
                  </td>
                </tr>
              ))}

            {/* Not paid Not delivered */}
            {/* <tr>
        <td>
          <b>Velcro Sneakers For Boys & Girls (Blue)</b>
        </td>
        <td>user@example.com</td>
        <td>$45,789</td>
        <td>
          <span className="badge rounded-pill alert-danger">Not paid</span>
        </td>
        <td>Dec 12 2021</td>
        <td>
          <span className="badge btn-dark">Not Delivered</span>
        </td>
        <td className="d-flex justify-content-end align-item-center">
          <Link to={`/order`} className="text-success">
            <i className="fas fa-eye"></i>
          </Link>
        </td>
      </tr> */}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Admins;
