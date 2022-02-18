import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { GlobalState } from "../../Context/GlobalState";
import { Loading } from "../../imports/index";
import { toast } from "react-toastify";
const initialState = {
  name: "",
  description: "",
  price: "",
  countInStock: "",
  rating: 0,
  numReviews: 0,
};
const EditProductMain = () => {
  const [states, setState] = useState(initialState);
  const state = useContext(GlobalState);
  const [callbackAdmin, setCallbackAdmin] = state.callbackAdmin;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { product } = useSelector((state) => ({
    ...state.products,
  }));
  const { admin, refreshTokenAdmin } = useSelector((state) => ({
    ...state.admin,
  }));
  const products = product.products;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...states, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!images)
      return swal("No Image Upload 😅.", {
        icon: "error",
      });
    try {
      await axios.put(
        `/api/product/update/${id}`,
        { ...states, image: images },
        {
          headers: {
            Authorization: `${refreshTokenAdmin.accessToken}`,
          },
        }
      );
      swal("Edit Product Successfully 😉", {
        icon: "success",
      });
      setCallbackAdmin(!callbackAdmin);
      navigate("/products");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      if (!file)
        return swal("File not Exists", {
          icon: "error",
        });
      if (file.size > 1024 * 1024)
        // 1mb
        return swal("Size too large!", {
          icon: "error",
        });
      if (file.type !== "image/jpeg" && file.type !== "image/png")
        // 1mb
        return swal("File format is incorrect.", {
          icon: "error",
        });
      let formData = new FormData();

      formData.append("file", file);
      setLoading(true);
      const res = await axios.post("/api/uploadImageUser", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `${refreshTokenAdmin.accessToken}`,
        },
      });

      setLoading(false);
      setImages(res.data);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  const handleDestroy = async () => {
    try {
      setLoading(true);
      await axios.post(
        "/api/destroyImageUser",
        { public_id: images.public_id },
        {
          headers: {
            Authorization: `${refreshTokenAdmin.accessToken}`,
          },
        }
      );
      setLoading(false);
      setImages(false);
    } catch (err) {
      alert(err.response.data.msg);
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
                          className="img-thumbnail rounded"
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
