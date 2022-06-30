import axios from "axios";
import React, { useContext, useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GlobalState } from "../../Context/GlobalState";
import { AddProduct } from "../../imports/Import";
import { toast } from "react-toastify";
import { Loading, SwaleMessage, useUpDesImg } from "../../imports/index";
import { DeleteCacheRedisInitial } from "../../Redux/RedisSlice";
const initialState = {
  name: "",
  description: "",
  price: "",
  countInStock: "",
  rating: 0,
  categories: "",
  numReviews: 0,
};
const AddProductMain = () => {
  const [states, setState] = useState(initialState);
  const inputRef = useRef();
  const dispatch = useDispatch();

  const { category } = useSelector((state) => ({
    ...state.categories,
  }));

  const { name, description, price, countInStock, categories } = states;
  const { refreshTokenAdmin } = useSelector((state) => ({
    ...state.admin,
  }));
  const { loading, handleUpload, handleDestroy, images } = useUpDesImg(
    refreshTokenAdmin.accessToken
  );
  const state = useContext(GlobalState);
  const [runProduct, setRunProduct] = state.runProduct;

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...states, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((name, description, price, countInStock, categories)) {
      if (!images) return SwaleMessage("No Image Upload 😅 !", "error");
    }
    try {
      await axios
        .post(
          AddProduct(),
          { ...states, image: images },
          {
            headers: {
              Authorization: `${refreshTokenAdmin.accessToken}`,
            },
          }
        )
        .then((item) => {
          dispatch(DeleteCacheRedisInitial({ key: "products" })).then(
            (items) => {
              setRunProduct(!runProduct);
              SwaleMessage("Create product Successfully", "success");
              navigate("/products");
            }
          );
        });
    } catch (error) {
      SwaleMessage(error.response.data.msg, "error");
    }
  };
  useEffect(() => {
    window.addEventListener("beforeunload", handleSubmit);

    return () => {
      window.removeEventListener("beforeunload", handleSubmit, {
        capture: true,
      });
    };
  }, []);
  const styleUpload = {
    display: images ? "block" : "none",
  };
  return (
    <>
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={handleSubmit}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Add product</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Publish Now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {/* {error && <Message variant="alert-danger">{error}</Message>} */}

                  <div className="mb-4">
                    {loading ? (
                      <Loading />
                    ) : (
                      <>
                        <img
                          src={images ? images.url : ""}
                          alt=""
                          className="img-thumbnail rounded img-thumbnail1"
                          style={styleUpload}
                        />
                        <label
                          className="form-control mt-3"
                          style={styleUpload}
                          onClick={handleDestroy}
                        >
                          Close Image X
                        </label>
                      </>
                    )}
                    <input
                      className="form-control mt-3"
                      type="file"
                      name="file"
                      id="file_up"
                      onChange={handleUpload}
                      ref={inputRef}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Product title
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={name}
                      name="name"
                      onChange={handleChange}
                      ref={inputRef}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={price}
                      name="price"
                      onChange={handleChange}
                      ref={inputRef}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Count In Stock
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={countInStock}
                      name="countInStock"
                      onChange={handleChange}
                      ref={inputRef}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Category
                    </label>
                    <select
                      className="form-control form-select"
                      onChange={handleChange}
                      name="categories"
                      value={categories}
                      ref={inputRef}
                    >
                      <option value="">Please select a category</option>
                      {category.categories &&
                        category.categories.map((category) => (
                          <option
                            value={category._id}
                            key={category._id}
                            style={{
                              backgroundImage:
                                category.image && category.image.url,
                            }}
                          >
                            {category.name}{" "}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Description</label>
                    <textarea
                      placeholder="Type here"
                      className="form-control"
                      rows="7"
                      required
                      name="description"
                      value={description}
                      onChange={handleChange}
                      ref={inputRef}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
