import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const FeedbackAdminMain = () => {
  const { feedback } = useSelector((state) => ({
    ...state.feedbacks,
  }));
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(10);
  const handleLoadMore = () => {
    setVisible((prev) => prev + 5);
  };
  return (
    <>
      {feedback.data && (
        <section className="content-main">
          <div className="content-header">
            <h2 className="content-title">Manager Feedback</h2>
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
                          <th scope="col">Content</th>

                          <th scope="col" className="text-end">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {feedback.data
                          .slice(0, visible)
                          .filter((value) => {
                            if (search === "") {
                              return value;
                            } else if (
                              value.title
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
                                <b>{order.content}</b>
                              </td>
                              <td className="d-flex justify-content-end align-item-center">
                                <Link
                                  to={`/replyuser/${order._id}`}
                                  className="text-success"
                                >
                                  <i className="fa-solid fa-reply"></i>{" "}
                                  &nbsp;&nbsp;
                                </Link>
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
