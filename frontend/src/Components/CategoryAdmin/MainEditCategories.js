import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../imports/index";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { GlobalState } from "../../Context/GlobalState";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateCategoriesInitial,
  reset,
  UpdateCategoriesInitial,
} from "../../Redux/CategoryAdminSlice";
const initialState = {
  name: "",
};
const MainEditCategories = () => {
  const [states, setState] = useState(initialState);
  const { name } = states;
  const { category, loadings, error, createCategory, updateCategory } =
    useSelector((state) => ({
      ...state.categories,
    }));
  const dispatch = useDispatch();
  const { refreshTokenAdmin } = useSelector((state) => ({
    ...state.admin,
  }));
  const token = refreshTokenAdmin.accessToken && refreshTokenAdmin.accessToken;
  const { id } = useParams();
  const [onEdit, setOnEdit] = useState(false);
  const [images, setImages] = useState(false);
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
            console.log(product);
            if (product.url === "") {
              setImages(product.url);
            } else {
              setImages(product);
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
        dispatch(UpdateCategoriesInitial({ token, id, name }));
      } else {
        dispatch(CreateCategoriesInitial({ token, id, name }));
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
        swal(updateCategory.msg, {
          icon: "success",
        });
        dispatch(reset());
      } else if (updateCategory.status === 400) {
        swal(updateCategory.msg, {
          icon: "error",
        });
        dispatch(reset());
      }
    } else {
      if (createCategory.status === 200) {
        setCallbackAdmin(!callbackAdmin);
        navigate("/category");
        swal(createCategory.msg, {
          icon: "success",
        });
        dispatch(reset());
      } else if (createCategory.status === 400) {
        swal(createCategory.msg, {
          icon: "error",
        });
        dispatch(reset());
      }
    }
  }, [createCategory, updateCategory, onEdit]);

  return (
    <>
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
