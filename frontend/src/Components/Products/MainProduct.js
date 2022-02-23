import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Message from "../../Pages/Error/Message";
import { useSelector } from "react-redux";
import { Loading, Product } from "../../imports/index";
import swal from "sweetalert";
import { GlobalState } from "../../Context/GlobalState";
import axios from "axios";
const MainProduct = () => {
  const { category } = useSelector((state) => ({
    ...state.categories,
  }));
  const state = useContext(GlobalState);
  const [product, setProduct] = state.ProductApi.product;
  const products = product;
  const [categoriess, setCategoriess] = state.ProductApi.categoriess;
  const [sort, setSort] = state.ProductApi.sort;
  const [search, setSearch] = useState("");
  const [callbackAdmin, setCallbackAdmin] = state.callbackAdmin;
  const [isCheck, setIsCheck] = useState(false);
  const { refreshTokenAdmin } = useSelector((state) => ({
    ...state.admin,
  }));

  //filter
  const handleCategory = (e) => {
    setCategoriess(e.target.value);
    setSearch("");
  };
  console.log(products);
  //check box
  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) {
        product.checked = !product.checked;
      }
    });
    setProduct([...product]);
  };
  const checkAll = () => {
    products.forEach((product) => {
      product.checked = !isCheck;
    });
    setProduct([...product]);
    setIsCheck(!isCheck);
  };

  const DeleteProduct = async (id) => {
    try {
      const deleteProduct = axios.delete(`/api/product/delete/${id}`, {
        headers: { Authorization: refreshTokenAdmin.accessToken },
      });
      await deleteProduct;
      setCallbackAdmin(!callbackAdmin);
      swal("Delete Product successfully 🤣!", {
        icon: "success",
      });
    } catch (err) {
      swal(err.response.data.msg, {
        icon: "error",
      });
    }
  };
  const deleteAll = () => {
    products.forEach((product) => {
      if (product.checked) DeleteProduct(product._id);
    });
    swal("Delete User successfully 🤣!", {
      icon: "success",
    });
  };
  //pagination
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(8);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const handleClick = (event) => {
    setcurrentPage(Number(event.target.id));
  };
  const pages = [];
  for (
    let i = 1;
    i <= Math.ceil(products && products.length / itemsPerPage);
    i++
  ) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    products && products.slice(indexOfFirstItem, indexOfLastItem);
  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={` page-link  ${currentPage == number ? "active1" : null}`}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });
  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}>&hellip;</li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip;</li>;
  }

  const handleLoadMore = () => {
    if (itemsPerPage === products && products.length) {
      return swal("It's over, my friend 😄", {
        icon: "error",
      });
    }
    setitemsPerPage(itemsPerPage + 4);
  };
  const renderData = (data, index) => {
    return (
      <>
        {data &&
          data
            .filter((value) => {
              if (search === "") {
                return value;
              } else if (
                value.name.toLowerCase().includes(search.toLowerCase()) ||
                value.categories.toLowerCase().includes(search.toLowerCase)
              ) {
                return value;
              }
            })
            .map((product) => (
              <Product
                product={product}
                key={product._id}
                handleCheck={handleCheck}
              />
            ))}
      </>
    );
  };
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
                <select
                  className="form-select"
                  name="categories"
                  value={categoriess}
                  onChange={handleCategory}
                >
                  <option>All category</option>
                  {category.categories &&
                    category.categories.map((item) => (
                      <option value={"categories=" + item.name} key={item._id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-lg-2 col-6 col-md-3">
                <select
                  className="form-select"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="sort=oldest">Oldest</option>
                  <option value="sort=-sold">Best sales</option>
                  <option value="sort=-price">Price: Hight-Low</option>
                  <option value="sort=price">Price: Low-Hight</option>
                </select>
              </div>
            </div>
            <div className="form-check"></div>
          </header>
          <header className="card-header bg-white ">
            <div className="content-header">
              <button onClick={deleteAll} className="btn btn-danger text-white">
                Delete Product
              </button>
              <div className="form-check">
                <label
                  className="form-check-label text-danger"
                  for="defaultCheck1"
                >
                  Choose All
                </label>
                <input
                  type="checkbox"
                  checked={isCheck}
                  onChange={checkAll}
                  className="form-check-input border-danger"
                />
              </div>
            </div>
          </header>

          <div className="card-body">
            <div className="row">
              {/* Products */}
              <>{renderData(currentItems)}</>
            </div>

            <nav className="float-end mt-4" aria-label="Page navigation">
              <ul className="pagination">
                <li className="page-item disabled">
                  <button
                    onClick={handlePrevbtn}
                    disabled={currentPage == pages[0] ? true : false}
                    id="page-link"
                  >
                    Previous
                  </button>
                </li>
                {pageDecrementBtn}
                {renderPageNumbers}
                {pageIncrementBtn}
                <li className="page-item">
                  <button
                    id="page-link"
                    onClick={handleNextbtn}
                    disabled={
                      currentPage == pages[pages.length - 1] ? true : false
                    }
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination  justify-content-center">
              <li className="page-item">
                <button className="page-link" onClick={handleLoadMore}>
                  {itemsPerPage === products && products.length
                    ? "it's over"
                    : "Load More"}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
};

export default MainProduct;
