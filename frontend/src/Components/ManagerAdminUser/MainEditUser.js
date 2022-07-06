import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GlobalState } from "../../Context/GlobalState";
import useDeleteCache from "../../CustomHook/UseDeleteCache";
import { updateUserAdmin } from "../../imports/Import";
import {
  Loading,
  MetaData,
  SwaleMessage,
  useUpDesImg,
} from "../../imports/index";
const initialState = {
  name: "",
  date_of_birth: "",
  phone_number: "",
  sex: "",
  role: "",
};
const MainEditUser = () => {
  const [states, setState] = useState(initialState);
  const { refreshTokenAdmin, userAll } = useSelector((state) => ({
    ...state.admin,
  }));
  const { loading, handleUpload, handleDestroy, images, setImages } =
    useUpDesImg(refreshTokenAdmin.accessToken);
  const { id } = useParams();
  const { CacheRedis } = useDeleteCache();

  const navigate = useNavigate();
  const user = userAll.user;
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
    if (!images) return SwaleMessage("No Image Upload 😅.", "error");
    try {
      await axios
        .patch(
          updateUserAdmin(id),
          { ...states, image: images },
          {
            headers: {
              Authorization: `${refreshTokenAdmin.accessToken}`,
            },
          }
        )
        .then((item) => {
          CacheRedis({ key: "users" });
          SwaleMessage("Edit User Successfully", "success");
          navigate("/users");
        });
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  const styleUpload = {
    display: images ? "block" : "none",
  };
  return (
    <>
      <MetaData title={`Edit-Customer-${states.name}`} />

      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={handleSubmit}>
          <div className="content-header">
            <Link to="/users" className="btn btn-danger text-white">
              Go to Users
            </Link>
            <h2 className="content-title">Edit User</h2>
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

export default MainEditUser;
