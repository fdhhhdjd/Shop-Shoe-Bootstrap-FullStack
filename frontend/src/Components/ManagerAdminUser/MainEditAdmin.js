import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../imports/index";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { GlobalState } from "../../Context/GlobalState";
import axios from "axios";
import { useSelector } from "react-redux";
const initialState = {
  name: "",
  date_of_birth: "",
  phone_number: "",
  sex: "",
  role: "",
};
const MainEditAdmin = () => {
  const [states, setState] = useState(initialState);
  const { refreshTokenAdmin, adminAll } = useSelector((state) => ({
    ...state.admin,
  }));
  console.log(states);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(false);
  const state = useContext(GlobalState);
  const [callbackAdmin, setCallbackAdmin] = state.callbackAdmin;
  const navigate = useNavigate();
  const user = adminAll.user;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...states, [name]: value });
  };
  useEffect(() => {
    if (id) {
      user &&
        user.forEach((product) => {
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!images)
      return swal("No Image Upload 😅.", {
        icon: "error",
      });
    try {
      await axios.patch(
        `/api/auth/updateUserAdmin/${id}`,
        { ...states, image: images },
        {
          headers: {
            Authorization: `${refreshTokenAdmin.accessToken}`,
          },
        }
      );
      setCallbackAdmin(!callbackAdmin);
      swal("Edit User Successfully", {
        icon: "success",
      });
      navigate("/admins");
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
            Authorization: ` ${refreshTokenAdmin.accessToken}`,
          },
        }
      );
      setLoading(false);
      setImages(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  const styleUpload = {
    display: images ? "block" : "none",
  };
  return (
    <>
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={handleSubmit}>
          <div className="content-header">
            <Link to="/admins" className="btn btn-danger text-white">
              Go to Admin
            </Link>
            <h2 className="content-title">Edit Admin</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Edit Now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
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
                          className="form-control mt-3 "
                          style={styleUpload}
                          onClick={handleDestroy}
                        >
                          Close Image&nbsp;<i className="fa-solid fa-trash"></i>
                        </label>
                      </>
                    )}
                    {!images && (
                      <input
                        className="form-control mt-3"
                        type="file"
                        name="file"
                        id="file_up"
                        onChange={handleUpload}
                      />
                    )}
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Name
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
                      Phone
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={states.phone_number}
                      name="phone_number"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Date
                    </label>
                    <input
                      type="date"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={states.date_of_birth}
                      name="date_of_birth"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Sex
                    </label>

                    <select
                      className="form-control form-select"
                      onChange={handleChange}
                      name="sex"
                      value={states.sex}
                    >
                      <option value="1" selected="">
                        Man
                      </option>
                      <option value="0" selected="">
                        Women
                      </option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Role
                    </label>

                    <select
                      className="form-control form-select"
                      onChange={handleChange}
                      name="role"
                      value={states.role}
                    >
                      <option value="1" selected="">
                        Admin
                      </option>
                      <option value="0" selected="">
                        Customer
                      </option>
                    </select>
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

export default MainEditAdmin;
