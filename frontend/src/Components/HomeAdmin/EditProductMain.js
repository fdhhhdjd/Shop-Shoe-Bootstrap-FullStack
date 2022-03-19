import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GlobalState } from "../../Context/GlobalState";
import { UpdateProduct } from "../../imports/Import";
import { Loading, SwaleMessage, useUpDesImg } from "../../imports/index";
const initialState = {
  name: "",
  description: "",
  price: "",
  countInStock: "",
  rating: 0,
  numReviews: 0,
  categories: "",
};
const EditProductMain = () => {
  const [states, setState] = useState(initialState);
  const state = useContext(GlobalState);
  const [callbackAdmin, setCallbackAdmin] = state.callbackAdmin;
  const { category } = useSelector((state) => ({
    ...state.categories,
  }));
  const { id } = useParams();
  const navigate = useNavigate();
  const { product } = useSelector((state) => ({
    ...state.products,
  }));
  const { refreshTokenAdmin } = useSelector((state) => ({
    ...state.admin,
  }));
  const { loading, handleUpload, handleDestroy, images, setImages } =
    useUpDesImg(refreshTokenAdmin);
  const products = product.products;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...states, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!images) return SwaleMessage("No Image Upload 😅 !", "error");

    try {
      await axios.put(
        UpdateProduct(id),
        { ...states, image: images },
        {
          headers: {
            Authorization: `${refreshTokenAdmin.accessToken}`,
          },
        }
      );
      SwaleMessage("Edit Product Successfully 😉", "success");
      setCallbackAdmin(!callbackAdmin);
      navigate("/products");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  useEffect(() => {
    if (id) {
      products &&
        products.forEach((product) => {
          if (product._id == id) {
            setState(product);
            if (product.url === "") {
              setImages(product.image.url);
            } else {
              setImages(product.image);
            }
          }
        });
    }
  }, [id]);
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
            <h2 className="content-title">Edit product</h2>
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
                          Close Image
                        </label>
                      </>
                    )}
                    <input
                      className="form-control mt-3"
                      type="file"
                      name="file"
                      id="file_up"
                      onChange={handleUpload}
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
                      value={states.name}
                      name="name"
                      onChange={handleChange}
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
                      value={states.price}
                      name="price"
                      onChange={handleChange}
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
                      value={states.countInStock}
                      name="countInStock"
                      onChange={handleChange}
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
                      value={states.categories}
                    >
                      {category.categories &&
                        category.categories.map((category) => (
                          <option value={category.name} key={category._id}>
                            {category.name}
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
                      value={states.description}
                      onChange={handleChange}
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

export default EditProductMain;
