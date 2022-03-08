import React, { useContext } from "react";
import { Loading } from "../../imports";
import Message from "../../Pages/Error/Message";
import { Link } from "react-router-dom";
import moment from "moment";
import { DeleteOrderNewUserInitial } from "../../Redux/OrderSlice";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "../../Context/GlobalState";
import swal from "sweetalert";
const History = ({ cartItems }) => {
  const { loading, order, error } = useSelector((state) => ({
    ...state.products,
  }));
  const { refreshToken } = useSelector((state) => ({ ...state.data }));
  const dispatch = useDispatch();
  const state = useContext(GlobalState);
  const [callback, setCallback] = state.callback;
  const token = refreshToken.accessToken && refreshToken.accessToken;
  const orders = order.history;
  const handleDelete = async (id) => {
    try {
      return await swal({
        title: "Are you sure you want delete ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(DeleteOrderNewUserInitial({ id }));
          setCallback(!callback);
          swal("Delete order Successfully 😉 !", {
            icon: "success",
          });
        } else {
          swal("Thank you for 😆'!");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log(order);
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
                      <th>STATUS BILL</th>
                      <th>DATE</th>
                      <th>TOTAL</th>
                      <th>Action</th>
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
                            {(order.order_status === "Delivered" && (
                              <span className="badge btn-success">
                                Delivered
                              </span>
                            )) ||
                              (order.order_status === "On Delivery" && (
                                <span className="badge btn-warning">
                                  On Delivery
                                </span>
                              )) ||
                              (order.order_status === "Ordered" && (
                                <span className="badge btn-danger">
                                  Ordered
                                </span>
                              ))}
                          </td>
                          <td>
                            {order.isPaid
                              ? moment(order.paidAt).calendar()
                              : moment(order.createdAt).calendar()}
                          </td>

                          {order.voucher === 0 ? (
                            <td>${order.cost}</td>
                          ) : (
                            <td>${order.total}</td>
                          )}
                          <td className="text-align-center">
                            &nbsp;&nbsp;&nbsp;
                            <i
                              className="fa-solid fa-trash-can"
                              onClick={() => handleDelete(order._id)}
                            ></i>
                          </td>
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
