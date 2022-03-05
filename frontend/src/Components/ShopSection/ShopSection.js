import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loading, Rating } from "../../imports/index";
import Message from "../../Pages/Error/Message";
import { Link } from "react-router-dom";
import { GlobalState } from "../../Context/GlobalState";
import swal from "sweetalert";
const ShopSection = React.forwardRef((props, ref) => {
  const { loading, product, error } = useSelector((state) => ({
    ...state.products,
  }));
  const products = product.products && product.products;
  const state = useContext(GlobalState);
  const [search] = state.ProductApi.search;
  //Pagination
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(6);
  console.log(products);

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
    setitemsPerPage(itemsPerPage + 3);
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
                value.name.toLowerCase().includes(search.toLowerCase())
              ) {
                return value;
              }
            })
            .map((product) => (
              <div
                className="shop col-lg-4 col-md-6 col-sm-6"
                key={product._id}
              >
                <div className="border-product">
                  <Link to={`/products/${product._id}`}>
                    <div className="shopBack">
                      {product.image && (
                        <img src={product.image.url} alt={product.name} />
                      )}
                    </div>
                  </Link>

                  <div className="shoptext">
                    <p>
                      <Link to={`/products/${product._id}`}>
                        {product.name}
                      </Link>
                    </p>

                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                    <h3>${product.price}</h3>
                  </div>
                </div>
              </div>
            ))}
      </>
    );
  };
  return (
    <>
      <div className="container" ref={ref}>
        <div className="section">
          <div className="row">
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {loading ? (
                  <div className="mb-5">
                    <Loading />
                  </div>
                ) : error ? (
                  <Message variant="alert-danger">{error}</Message>
                ) : (
                  <>{renderData(currentItems)}</>
                )}

                <nav className="float-end mt-4" aria-label="Page navigation">
                  <ul className="pagination  justify-content-center">
                    <li className="page-item disabled ">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default ShopSection;
