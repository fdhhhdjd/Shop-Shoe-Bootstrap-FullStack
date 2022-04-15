import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { GlobalState } from "../../Context/GlobalState";
import {
  Loading,
  SwaleMessage,
  useUpDesImg,
  MetaData,
} from "../../imports/index";
import {
  CreateCategoriesInitial,
  reset,
  UpdateCategoriesInitial,
} from "../../Redux/CategoryAdminSlice";
const initialState = {
  name: "",
  image: "",
};
const MainEditCategories = () => {
  const [states, setState] = useState(initialState);
  const { name, image } = states;
  const { category, loadings, error, createCategory, updateCategory } =
    useSelector((state) => ({
      ...state.categories,
    }));
  const dispatch = useDispatch();
  const { refreshTokenAdmin } = useSelector((state) => ({
    ...state.admin,
  }));
  const token = refreshTokenAdmin.accessToken && refreshTokenAdmin.accessToken;
  const { handleUpload, handleDestroy, images, setImages } = useUpDesImg(token);
  const { id } = useParams();
  const [onEdit, setOnEdit] = useState(false);
  const state = useContext(GlobalState);
  const [callbackAdmin, setCallbackAdmin] = state.callbackAdmin;
  const navigate = useNavigate();
  const categories = category.categories && category.categories;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...states, [name]: value });
  };
  useEffect(() => {
    if (id) {
      setOnEdit(true);
      category.categories &&
        category.categories.forEach((product) => {
          if (product._id == id) {
            setState(product);
            if (product.image === "") {
              setImages(product.image);
            } else {
              setImages(product.image);
            }
          }
        });
    } else {
      setOnEdit(false);
      setState(initialState);
      setImages(false);
    }
  }, [id, categories]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        dispatch(UpdateCategoriesInitial({ token, id, name, image, images }));
      } else {
        dispatch(CreateCategoriesInitial({ token, id, name, image, images }));
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  useEffect(() => {
    if (onEdit) {
      if (updateCategory.status === 200) {
        setCallbackAdmin(!callbackAdmin);
        navigate("/category");
        SwaleMessage(updateCategory.msg, "success");

        dispatch(reset());
      } else if (updateCategory.status === 400) {
        SwaleMessage(updateCategory.msg, "error");
        dispatch(reset());
      }
    } else {
      if (createCategory.status === 200) {
        setCallbackAdmin(!callbackAdmin);
        navigate("/category");
        SwaleMessage(createCategory.msg, "success");

        dispatch(reset());
      } else if (createCategory.status === 400) {
        SwaleMessage(createCategory.msg, "error");

        dispatch(reset());
      }
    }
  }, [createCategory, updateCategory, onEdit]);
  const styleUpload = {
    display: images ? "block" : "none",
  };
  return (
    <>
      {onEdit ? (
        <MetaData title={`Edit-${states.name}`} />
      ) : (
        <MetaData title="Add-Category" />
      )}

      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={handleSubmit}>
          <div className="content-header">
            <Link to="/category" className="btn btn-danger text-white">
              Go to Category
            </Link>
            <h2 className="content-title">
              {onEdit ? "Edit Category" : "Create Category"}
            </h2>
            <div>
              <button type="submit" className="btn btn-primary">
                {onEdit ? "Edit Now" : "Create Now"}
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <div className="mb-4">
                    {loadings ? (
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
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default MainEditCategories;
