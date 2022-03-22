import moment from "moment";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GlobalState } from "../../Context/GlobalState";
import { deleteUserAdmin } from "../../imports/Import";
import { SwaleMessage, useDelete } from "../../imports/index";
const Users = (props) => {
  const { orders, visible, search } = props;
  const state = useContext(GlobalState);
  const [users, setUsers] = state.UserApi.users;
  const { refreshTokenAdmin } = useSelector((state) => ({
    ...state.admin,
  }));
  const [callbackAdmin, setCallbackAdmin] = state.callbackAdmin;
  const [isCheck, setIsCheck] = useState(false);
  const { mutate } = useDelete();
  const handleDelete = async (id) => {
    mutate(() => deleteUserAdmin(id, refreshTokenAdmin.accessToken));
  };
  const deleteUser = async (id) => {
    try {
      deleteUserAdmin(id, refreshTokenAdmin.accessToken);
      setCallbackAdmin(!callbackAdmin);
      SwaleMessage("Delete User successfully 🤣!", "success");
    } catch (err) {
      SwaleMessage(err.response.data.msg, "error");
    }
  };
  const handleCheck = (id) => {
    users.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setUsers([...users]);
  };
  const deleteAll = () => {
    users.forEach((product) => {
      if (product.checked) deleteUser(product._id);
    });
    SwaleMessage("Delete User successfully 🤣!", "success");
  };
  const checkAll = () => {
    users.forEach((product) => {
      product.checked = !isCheck;
    });
    setUsers([...users]);
    setIsCheck(!isCheck);
  };
  return (
    <>
      <div className="content-header">
        <button onClick={deleteAll} className="btn btn-danger text-white">
          Delete User
        </button>
        <div className="form-check">
          <label className="form-check-label text-danger" for="defaultCheck1">
            Choose All
          </label>
          <input
            type="checkbox"
            checked={isCheck}
            onChange={checkAll}
            className="form-check-input border-danger"
          />
        </div>
      </div>
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
              <th scope="col" className="text-end">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users
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
                  <td>{order.role === 0 && "Customer"}</td>
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
                  <td className="d-flex justify-content-end align-item-center">
                    <Link
                      to={`/editUsers/${order._id}`}
                      className="text-success"
                    >
                      <i className="fa-solid fa-pencil"></i> &nbsp;&nbsp;
                    </Link>
                    <i
                      className="fa-solid fa-trash text-success"
                      onClick={() => handleDelete(order._id)}
                    ></i>
                    &nbsp;&nbsp;
                    <input
                      type="checkbox"
                      className="text-success form-check-input"
                      checked={order.checked}
                      onChange={() => handleCheck(order._id)}
                    />
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

export default Users;
