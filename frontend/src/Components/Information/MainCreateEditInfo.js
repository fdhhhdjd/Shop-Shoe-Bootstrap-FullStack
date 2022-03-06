import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loading } from "../../imports/index";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { GlobalState } from "../../Context/GlobalState";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateInformationInitial,
  reset,
  CreateInformationInitial,
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
  const { id } = useParams();
  const [onEdit, setOnEdit] = useState(false);
  const [images, setImages] = useState(false);
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
            console.log(product);
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

      const res = await axios.post("/api/uploadImageUser", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `${refreshTokenAdmin.accessToken}`,
        },
      });

      setImages(res.data);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  const handleDestroy = async () => {
    try {
      await axios.post(
        "/api/destroyImageUser",
        { public_id: images.public_id },
        {
          headers: {
            Authorization: `${refreshTokenAdmin.accessToken}`,
          },
        }
      );

      setImages(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  useEffect(() => {
    if (onEdit) {
      if (updateInformation.status === 200) {
        setCallbackAdmin(!callbackAdmin);
        navigate("/info");
        swal(updateInformation.msg, {
          icon: "success",
        });
        dispatch(reset());
      } else if (updateInformation.status === 400) {
        swal(updateInformation.msg, {
          icon: "error",
        });
        dispatch(reset());
      }
    } else {
      if (createInformation.status === 200) {
        setCallbackAdmin(!callbackAdmin);
        navigate("/info");
        swal(createInformation.msg, {
          icon: "success",
        });
        dispatch(reset());
      } else if (createInformation.status === 400) {
        swal(createInformation.msg, {
          icon: "error",
        });
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
