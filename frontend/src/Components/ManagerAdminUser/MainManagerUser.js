import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Loading, Users, Message } from "../../imports";
const MainManagerUser = () => {
  const { userAll, loading, error, uncheck } = useSelector((state) => ({
    ...state.admin,
  }));

  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(10);
  const handleLoadMore = () => {
    setVisible((prev) => prev + 5);
  };
  return (
    <>
      {userAll.user && (
        <section className="content-main">
          <div className="content-header">
            <h2 className="content-title">Manager User</h2>
            <div>
              <Link to="/unusers" className="btn btn-primary">
                UserUnChecked &nbsp;
                <span className="badge1 badge">
                  {uncheck.user && uncheck.user.length}
                </span>
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
                {loading ? (
                  <Loading />
                ) : error ? (
                  <Message variant="alert-danger">{error}</Message>
                ) : (
                  <Users
                    orders={userAll.user}
                    visible={visible}
                    search={search}
                  />
                )}
              </div>
            </div>
          </div>
          <nav className="float-center mt-4" aria-label="Page navigation">
            <ul className="pagination  justify-content-center">
              <li className="page-item">
                {userAll.user && visible < userAll.user.length && (
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

export default MainManagerUser;
