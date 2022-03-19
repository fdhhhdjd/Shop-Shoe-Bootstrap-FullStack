import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { GlobalState } from "../../Context/GlobalState";
import { Loading, SwaleMessage, useUpDesImg } from "../../imports/index";
import {
  CreateInformationInitial,
  reset,
  UpdateInformationInitial,
} from "../../Redux/InformationAdminSlice";
const initialState = {
  heading: "",
  descriptions: "",
  image: "",
};
const MainCreateEditInfo = () => {
  const [states, setState] = useState(initialState);
  const { heading, descriptions, image } = states;
  const { Information, loadings, error, createInformation, updateInformation } =
    useSelector((state) => ({
      ...state.info,
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
  const carousels = Information.carousels && Information.carousels;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...states, [name]: value });
  };
  useEffect(() => {
    if (id) {
      setOnEdit(true);
      Information.carousels &&
        Information.carousels.forEach((product) => {
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
  }, [id, carousels]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        dispatch(
          UpdateInformationInitial({
            token,
            id,
            heading,
            descriptions,
            image,
            images,
          })
        );
      } else {
        dispatch(
          CreateInformationInitial({
            token,
            id,
            heading,
            descriptions,
            image,
            images,
          })
        );
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  useEffect(() => {
    if (onEdit) {
      if (updateInformation.status === 200) {
        setCallbackAdmin(!callbackAdmin);
        navigate("/info");
        SwaleMessage(updateInformation.msg, "success");

        dispatch(reset());
      } else if (updateInformation.status === 400) {
        SwaleMessage(updateInformation.msg, "error");

        dispatch(reset());
      }
    } else {
      if (createInformation.status === 200) {
        setCallbackAdmin(!callbackAdmin);
        navigate("/info");
        SwaleMessage(createInformation.msg, "success");
        dispatch(reset());
      } else if (createInformation.status === 400) {
        SwaleMessage(createInformation.msg, "error");

        dispatch(reset());
      }
    }
  }, [createInformation, updateInformation, onEdit]);
  const styleUpload = {
    display: images ? "block" : "none",
  };
  console.log(error);
  return (
    <>
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={handleSubmit}>
          <div className="content-header">
            <Link to="/Information" className="btn btn-danger text-white">
              Go to Information
            </Link>
            <h2 className="content-title">
              {onEdit ? "Edit Information" : "Create Information"}
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
                      Heading
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={states.heading}
                      name="heading"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Descriptions
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={states.descriptions}
                      name="descriptions"
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

export default MainCreateEditInfo;
