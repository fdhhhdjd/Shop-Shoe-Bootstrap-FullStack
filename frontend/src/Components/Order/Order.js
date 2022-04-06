import moment from "moment";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import Swal from "sweetalert2";
import { GlobalState } from "../../Context/GlobalState";
import { Loading } from "../../imports";
import { CheckPass, True } from "../../imports/Image";
import Message from "../../Pages/Error/Message";
import { CheckPasswordInitiate } from "../../Redux/AuthenticationSlice";
import { DeleteOrderNewUserInitial } from "../../Redux/OrderSlice";
const History = () => {
  const { loading, order, error } = useSelector((state) => ({
    ...state.products,
  }));
  const { refreshToken, profile } = useSelector((state) => ({ ...state.data }));
  const token = refreshToken.accessToken;
  const dispatch = useDispatch();
  const state = useContext(GlobalState);
  const [callback, setCallback] = state.callback;
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
          Swal.fire({
            title: "Please Enter Password !!",
            input: "password",
            inputAttributes: {
              autocapitalize: "off",
            },
            showCancelButton: true,
            confirmButtonText: "Enter",
            confirmButtonColor: "#1cb803",
            showLoaderOnConfirm: true,
            preConfirm: (checkPass) => {
              return dispatch(CheckPasswordInitiate({ token, checkPass }))
                .then((response) => {
                  if (response.payload.status === 400) {
                    return Swal.showValidationMessage(
                      `Request failed: ${response.payload.msg}`
                    );
                  } else if (response.payload.status === 200) {
                    dispatch(DeleteOrderNewUserInitial({ id }));
                    setCallback(!callback);
                  }
                })
                .catch((error) => {
                  return Swal.showValidationMessage(`Request failed: ${error}`);
                });
            },
            allowOutsideClick: () => !Swal.isLoading(),
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Admin Thank You 😊!!",
                imageUrl: `${profile.user && profile.user.image.url}`,
                width: 600,
                padding: "3em",
                color: "#716add",
                background: `#fff url(${True}) `,
                backdrop: `
                    rgba(0,0,123,0.4)
                    url(${CheckPass})
                    left top
                    no-repeat
                  `,
              });
            }
          });
        } else {
          swal("Thank you for 😆'!");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
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
