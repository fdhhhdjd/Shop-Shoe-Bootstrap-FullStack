import React, { useState } from "react";
import { Link } from "react-router-dom";
import Message from "../../Pages/Error/Message";
import { useSelector } from "react-redux";
import { Loading, Product } from "../../imports/index";
const MainProduct = () => {
  const { loading, product } = useSelector((state) => ({
    ...state.products,
  }));
  const products = product.products;
  const [search, setSearch] = useState("");
  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">Products</h2>
          <div>
            <Link to="/addproduct" className="btn btn-primary">
              Create new
            </Link>
          </div>
        </div>

        <div className="card mb-4 shadow-sm">
          <header className="card-header bg-white ">
            <div className="row gx-3 py-3">
              <div className="col-lg-4 col-md-6 me-auto ">
                <input
                  type="search"
                  placeholder="Search..."
                  className="form-control p-2"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="col-lg-2 col-6 col-md-3">
                <select className="form-select">
                  <option>All category</option>
                  <option>Electronics</option>
                  <option>Clothings</option>
                  <option>Something else</option>
                </select>
              </div>
              <div className="col-lg-2 col-6 col-md-3">
                <select className="form-select">
                  <option>Latest added</option>
                  <option>Cheap first</option>
                  <option>Most viewed</option>
                </select>
              </div>
            </div>
          </header>

          <div className="card-body">
            {loading ? (
              <Loading />
            ) : (
              <div className="row">
                {/* Products */}
                {products &&
                  products
                    .filter((value) => {
                      if (search === "") {
                        return value;
                      } else if (
                        value.name.toLowerCase().includes(search.toLowerCase())
                      ) {
                        return value;
                      }
                    })
                    .map((product) => (
                      <Product product={product} key={product._id} />
                    ))}
              </div>
            )}

            <nav className="float-end mt-4" aria-label="Page navigation">
              <ul className="pagination">
                <li className="page-item disabled">
                  <Link className="page-link" to="#">
                    Previous
                  </Link>
                </li>
                <li className="page-item active">
                  <Link className="page-link" to="#">
                    1
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="#">
                    2
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="#">
                    3
                  </Link>
                </li>
                <li className="page-item">
                  <Link className="page-link" to="#">
                    Next
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainProduct;
