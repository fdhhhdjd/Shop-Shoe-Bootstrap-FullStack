import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import CountUp from "react-countup";
import { reset, UndoOrderNewUserInitial } from "../../Redux/OrderSlice";
import { GlobalState } from "../../Context/GlobalState";
import { useDispatch, useSelector } from "react-redux";
import { SwaleMessage } from "../../imports";
const OrdersDelete = (props) => {
  const { orders, visible, search } = props;
  const dispatch = useDispatch();
  const state = useContext(GlobalState);
  const [callbackAdmin, setCallbackAdmin] = state.callbackAdmin;
  const { undoPayments } = useSelector((state) => ({
    ...state.order,
  }));
  const handleUndo = (id) => {
    try {
      dispatch(UndoOrderNewUserInitial({ id }));
      setCallbackAdmin(!callbackAdmin);
      SwaleMessage("Undo Order Customer successfully 🤩", "success");
    } catch (error) {
      SwaleMessage(error.response.data.msg, "error");
    }
  };
  useEffect(() => {
    if (undoPayments.status === 200) {
      dispatch(reset());
    }
  }, [undoPayments]);
  return (
    <>
      {orders && orders.length === 0 ? (
        <nav className="float-center mt-4" aria-label="Page navigation">
          <ul className="pagination  justify-content-center">
            <li className="page-item">
              <h1 style={{ color: "red" }}>Trash Order Empty</h1>
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
            {orders &&
              orders
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
                      {!order.isDelivered ? (
                        <span className="badge btn-success">Delivered</span>
                      ) : (
                        <span className="badge btn-dark">Not delivered</span>
                      )}
                    </td>
                    <td className="text-align-center text-success">
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <i
                        className="fa-solid fa-rotate-left"
                        onClick={() => handleUndo(order._id)}
                      ></i>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default OrdersDelete;
