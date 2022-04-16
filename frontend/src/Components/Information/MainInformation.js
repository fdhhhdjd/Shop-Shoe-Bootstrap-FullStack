import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { GlobalState } from "../../Context/GlobalState";
import { Loading } from "../../imports";
import { Message, SwaleMessage, LazyLoadImg } from "../../imports/index";
import {
  DeleteInformationInitial,
  reset,
} from "../../Redux/InformationAdminSlice";

const MainInformation = () => {
  const { Information, loadings, error, deleteInformation } = useSelector(
    (state) => ({
      ...state.info,
    })
  );
  const { refreshTokenAdmin } = useSelector((state) => ({
    ...state.admin,
  }));
  const state = useContext(GlobalState);
  const [callbackAdmin, setCallbackAdmin] = state.callbackAdmin;
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(10);
  const handleLoadMore = () => {
    setVisible((prev) => prev + 5);
  };
  const token = refreshTokenAdmin.accessToken && refreshTokenAdmin.accessToken;
  const handleDelete = async (id) => {
    try {
      return await swal({
        title: "Are you sure you want delete ?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          dispatch(DeleteInformationInitial({ id, token }));
        } else {
          SwaleMessage("Thank you for 😆'!");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (deleteInformation.status === 200) {
      setCallbackAdmin(!callbackAdmin);
      SwaleMessage(deleteInformation.msg, "success");
      dispatch(reset());
    } else if (deleteInformation.status === 400) {
      SwaleMessage(deleteInformation.msg, "error");
      dispatch(reset());
    }
  }, [deleteInformation]);
  return (
    <>
      {Information.carousels && (
        <section className="content-main">
          <div className="content-header">
            <h2 className="content-title">Manager Information</h2>
            <div>
              <Link to="/createInfo" className="btn btn-primary">
                Create Information
              </Link>
            </div>
          </div>
          <div className="card mb-4 shadow-sm">
            <header className="card-header bg-white">
              <div className="row gx-3 py-3">
                <div className="col-lg-4 col-md-6 me-auto">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="form-control p-2"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                  />
                </div>
              </div>
            </header>
            <div className="card-body">
              <div className="table-responsive">
                {loadings ? (
                  <Loading />
                ) : error ? (
                  <Message variant="alert-danger">{error}</Message>
                ) : (
                  <>
                    {Information.carousels.length === 0 ? (
                      <nav
                        className="float-center mt-4"
                        aria-label="Page navigation"
                      >
                        <ul className="pagination  justify-content-center">
                          <li className="page-item">
                            <h1 style={{ color: "red" }}>Information Empty</h1>
                          </li>
                        </ul>
                      </nav>
                    ) : (
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Code Id</th>
                            <th scope="col">Images</th>
                            <th scope="col">Name</th>
                            <th scope="col">Descriptions</th>
                            <th scope="col" className="text-end">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {Information.carousels
                            .slice(0, visible)
                            .filter((value) => {
                              if (search === "") {
                                return value;
                              } else if (
                                value.name
                                  .toLowerCase()
                                  .includes(search.toLowerCase())
                              ) {
                                return value;
                              }
                            })
                            .map((order) => (
                              <tr key={order._id}>
                                <td>
                                  <b>{order._id}</b>
                                </td>
                                <td>
                                  {order && order.image && (
                                    <LazyLoadImg
                                      url={order.image.url}
                                      style={{
                                        width: "45px",
                                        height: "45px",
                                        borderRadius: "50%",
                                        objectFit: "cover",
                                      }}
                                    />
                                  )}
                                </td>
                                <td>
                                  <b>{order.heading}</b>
                                </td>
                                <td>
                                  <b>{order.descriptions}</b>
                                </td>
                                <td className="d-flex justify-content-end align-item-center">
                                  <Link
                                    to={`/editInfo/${order._id}`}
                                    className="text-success"
                                  >
                                    <i className="fa-solid fa-pencil"></i>{" "}
                                    &nbsp;&nbsp;
                                  </Link>
                                  <i
                                    className="fa-solid fa-trash text-success"
                                    onClick={() => handleDelete(order._id)}
                                  ></i>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <nav className="float-center mt-4" aria-label="Page navigation">
            <ul className="pagination  justify-content-center">
              <li className="page-item">
                {Information.carousels &&
                  visible < Information.carousels.length && (
                    <button className="page-link" onClick={handleLoadMore}>
                      Load More <i className="fa-solid fa-angle-down"></i>
                    </button>
                  )}
              </li>
            </ul>
          </nav>
        </section>
      )}
    </>
  );
};

export default MainInformation;
