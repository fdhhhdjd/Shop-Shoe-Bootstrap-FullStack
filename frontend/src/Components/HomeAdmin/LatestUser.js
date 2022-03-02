import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Loading } from "../../imports/index";
import Message from "../../Pages/Error/Message";
const LatestUser = () => {
  const { newCountUser, loading, error } = useSelector((state) => ({
    ...state.admin,
  }));
  const [visible, setVisible] = useState(3);
  const handleLoadMore = () => {
    setVisible((e) => e + 3);
  };
  return (
    <div className="card-body">
      <h4 className="card-title"> New Account</h4>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          {newCountUser.result && newCountUser.result.length === 0 ? (
            <nav className="float-center mt-4" aria-label="Page navigation">
              <ul className="pagination  justify-content-center">
                <li className="page-item">
                  <h1 style={{ color: "red" }}>No User New</h1>
                </li>
              </ul>
            </nav>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <tbody>
                  {newCountUser.result &&
                    newCountUser.result.slice(0, visible).map((order) => (
                      <tr key={order._id}>
                        <td>
                          <div className="col-md-4 px-4">
                            <img
                              src={order.image && order.image.url}
                              alt={order._id}
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        </td>
                        <td>{order.email}</td>
                        <td>
                          <b>{order.name}</b>
                        </td>

                        <td>
                          {(order.role === 1 && "admin") ||
                            (order.role === 0 && "customer")}
                        </td>

                        <td>{moment(order.createdAt).calendar()}</td>
                        <td className="d-flex justify-content-end align-item-center">
                          <Link
                            to={`/order/${order._id}`}
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
                    {newCountUser.result &&
                      visible < newCountUser.result.length && (
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

export default LatestUser;
