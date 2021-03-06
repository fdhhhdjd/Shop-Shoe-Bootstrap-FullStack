import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Loading, OrdersDelete, Message } from "../../imports";

const MainOrderDelete = () => {
  const { orders, loading, error } = useSelector((state) => ({
    ...state.order,
  }));
  const order = orders.payments && orders.payments;
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(10);
  const handleLoadMore = () => {
    setVisible((prev) => prev + 5);
  };
  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <div>
            <Link to="/orders" className="btn btn-danger text-white">
              Back Order&nbsp;
            </Link>
          </div>
          <h2 className="content-title">Trash Can Order Customer </h2>
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
                <select className="form-select">
                  <option>Status</option>
                  <option>Active</option>
                  <option>Disabled</option>
                  <option>Show all</option>
                </select>
              </div>
              <div className="col-lg-2 col-6 col-md-3">
                <select className="form-select">
                  <option>Show 20</option>
                  <option>Show 30</option>
                  <option>Show 40</option>
                </select>
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
                <OrdersDelete
                  orders={order}
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
              {orders.payments && visible < orders.payments.length && (
                <button className="page-link" onClick={handleLoadMore}>
                  Load More <i className="fa-solid fa-angle-down"></i>
                </button>
              )}
            </li>
          </ul>
        </nav>
      </section>
    </>
  );
};

export default MainOrderDelete;
