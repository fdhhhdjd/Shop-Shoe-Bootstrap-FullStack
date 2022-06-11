import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FilterSeenAndNotSeenInitial,
  GetFeedbacksInitial,
  ReadingFeedbacksInitial,
  SearchDateInitial,
} from "../../Redux/FeedbackSlice";
const initialState = {
  search_text: "",
  DateFrom: "",
  DateTo: "",
};
const FeedbackAdminMain = () => {
  const [states, setState] = useState(initialState);
  const { DateFrom, DateTo } = states;
  const [sort, setSort] = useState("");

  const { feedback } = useSelector((state) => ({
    ...state.feedbacks,
  }));

  const { refreshTokenAdmin } = useSelector((state) => ({
    ...state.admin,
  }));
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(10);
  const refreshTokensAdmin = refreshTokenAdmin && refreshTokenAdmin.accessToken;
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...states, [name]: value });
  };
  const HandleModalContent = async (id) => {
    feedback?.data.forEach(async (item) => {
      if (item._id === id) {
        if (item.checked === false) {
          Swal.fire({
            title: `Feedback:${item.fullname} !`,
            text: `${item.content}`,
            imageUrl: "https://unsplash.it/400/200",
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "Custom image",
          });
          dispatch(ReadingFeedbacksInitial(id));
          dispatch(GetFeedbacksInitial({ refreshTokensAdmin }));
        }
        Swal.fire({
          title: `Feedback:${item.fullname} !`,
          text: `${item.content}`,
          imageUrl: "https://unsplash.it/400/200",
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
        });
      }
    });
  };
  const resetAllFeedBack = (e) => {
    e.preventDefault();
    dispatch(GetFeedbacksInitial({ refreshTokensAdmin }));
    setState({ DateFrom: "", DateTo: "" });
    setSort("0");
  };
  const handleLoadMore = () => {
    setVisible((prev) => prev + 5);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    dispatch(SearchDateInitial({ DateFrom, DateTo }));
  };
  const handleFilter = async (e) => {
    dispatch(FilterSeenAndNotSeenInitial({ sort }));
  };
  useEffect(() => {
    if (sort === "0" || sort === "1" || sort === "2") {
      handleFilter();
    }
  }, [sort]);
  return (
    <>
      {feedback.data && (
        <section className="content-main">
          <div className="content-header">
            <h2 className="content-title">Manager Feedback</h2>
            <div>
              <button className="btn btn-primary" onClick={resetAllFeedBack}>
                Reset All
              </button>
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
                <div className="col-lg-2 col-6 col-md-3">
                  <input
                    type="date"
                    placeholder="Search..."
                    className="form-control"
                    value={DateFrom}
                    name="DateFrom"
                    onChange={handleChange}
                  />
                </div>
                {sort === "2" ? (
                  ""
                ) : (
                  <>
                    &nbsp;&nbsp;
                    <div className="col-lg-2 col-6 col-md-3">
                      <input
                        type="date"
                        placeholder="Search..."
                        className="form-control"
                        value={DateTo}
                        name="DateTo"
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}
                &nbsp;&nbsp;
                <div className="col-lg-1 col-6 col-md-3">
                  <button className="btn btn-primary" onClick={handleSearch}>
                    Search
                  </button>
                </div>
                &nbsp;&nbsp;
                <div className="col-lg-2 col-6 col-md-3">
                  <select
                    className="form-select"
                    onChange={(e) => setSort(e.target.value)}
                    value={sort}
                  >
                    <option>Choose Fillter</option>
                    <option value="0">All Feedback</option>
                    <option value="1">Feedback Seen</option>
                    <option value="2">Feedback Not Seen</option>
                  </select>
                </div>
              </div>
            </header>
            <div className="card-body">
              <div className="table-responsive">
                <>
                  {feedback.data.length === 0 ? (
                    <nav
                      className="float-center mt-4"
                      aria-label="Page navigation"
                    >
                      <ul className="pagination  justify-content-center">
                        <li className="page-item">
                          <h1 style={{ color: "red" }}>feedback Empty</h1>
                        </li>
                      </ul>
                    </nav>
                  ) : (
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Full Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Subject</th>
                          <th scope="col">Send_At</th>
                          <th scope="col">Status</th>
                          <th scope="col">Read_At</th>
                          <th scope="col" className="text-end">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {feedback?.data
                          .slice(0, visible)
                          .filter((value) => {
                            if (search === "") {
                              return value;
                            } else if (
                              value.fullname
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||
                              value.email
                                .toLowerCase()
                                .includes(search.toLowerCase())
                            ) {
                              return value;
                            }
                          })
                          .map((order) => (
                            <tr key={order._id}>
                              <td>
                                <b>{order.fullname}</b>
                              </td>
                              <td>
                                <b>{order.email}</b>
                              </td>
                              <td>
                                <b>{order.subject}</b>
                              </td>
                              <td>
                                <b>{moment(order.send_at).calendar()}</b>
                              </td>
                              <td>
                                {order.checked === false ? (
                                  <b style={{ color: "red" }}>Not Seen</b>
                                ) : (
                                  <b> Seen</b>
                                )}
                              </td>

                              <td>
                                {order.read_at === null ? (
                                  <b style={{ color: "red" }}>Not Date</b>
                                ) : (
                                  <b>{moment(order.read_at).calendar()}</b>
                                )}
                              </td>
                              <td className="d-flex justify-content-end align-item-center">
                                <Link
                                  to={`/replyuser/${order._id}`}
                                  className="text-success"
                                >
                                  <i className="fa-solid fa-reply"></i>{" "}
                                  &nbsp;&nbsp;
                                </Link>
                                <p
                                  className="text-success"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => HandleModalContent(order._id)}
                                >
                                  <i className="fas fa-eye"></i> &nbsp;&nbsp;
                                </p>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  )}
                </>
              </div>
            </div>
          </div>
          <nav className="float-center mt-4" aria-label="Page navigation">
            <ul className="pagination  justify-content-center">
              <li className="page-item">
                {feedback.data && visible < feedback.data.length && (
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

export default FeedbackAdminMain;
