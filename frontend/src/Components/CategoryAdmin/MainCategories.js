import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading, Admins } from "../../imports";
import Message from "../../Pages/Error/Message";
import { Link } from "react-router-dom";
import { GlobalState } from "../../Context/GlobalState";
import swal from "sweetalert";
import axios from "axios";
import { DeleteCategoriesInitial } from "../../Redux/CategoryAdminSlice";
import { reset } from "../../Redux/CategoryAdminSlice";
const MainCategories = () => {
  const { category, loadings, error, deleteCategory } = useSelector(
    (state) => ({
      ...state.categories,
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
          dispatch(DeleteCategoriesInitial({ id, token }));
        } else {
          swal("Thank you for 😆'!");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (deleteCategory.status === 200) {
      setCallbackAdmin(!callbackAdmin);
      swal(deleteCategory.msg, {
        icon: "success",
      });
      dispatch(reset());
    } else if (deleteCategory.status === 400) {
      swal(deleteCategory.msg, {
        icon: "error",
      });
      dispatch(reset());
    }
  }, [dispatch, deleteCategory]);
  return (
    <>
      {category.categories && (
        <section className="content-main">
          <div className="content-header">
            <h2 className="content-title">Manager Category</h2>
            <div>
              <Link to="/createCategory" className="btn btn-primary">
                Create Category
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
                    {category.categories.length === 0 ? (
                      <nav
                        className="float-center mt-4"
                        aria-label="Page navigation"
                      >
                        <ul className="pagination  justify-content-center">
                          <li className="page-item">
                            <h1 style={{ color: "red" }}>Category Empty</h1>
                          </li>
                        </ul>
                      </nav>
                    ) : (
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Code Id</th>
                            <th scope="col">Name</th>
                            <th scope="col" className="text-end">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {category.categories
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
                                  <b>{order.name}</b>
                                </td>
                                <td className="d-flex justify-content-end align-item-center">
                                  <Link
                                    to={`/editCategory/${order._id}`}
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
                {category.categories && visible < category.categories.length && (
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

export default MainCategories;
