import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import swal from "sweetalert";
import { GlobalState } from "../../Context/GlobalState";
import { MetaData } from "../../imports";
import {
  CreateVoucherInitial,
  reset,
  UpdateVoucherInitial,
} from "../../Redux/VoucherSlice";
const initialState = {
  title: "",
  value: "",
};
const MainCreateVoucher = () => {
  const [states, setState] = useState(initialState);
  const { title, value } = states;
  const { Voucher, loadings, error, createVoucher, updateVoucher } =
    useSelector((state) => ({
      ...state.vouchers,
    }));
  const dispatch = useDispatch();
  const { refreshTokenAdmin } = useSelector((state) => ({
    ...state.admin,
  }));
  const token = refreshTokenAdmin.accessToken && refreshTokenAdmin.accessToken;
  const { id } = useParams();
  const [onEdit, setOnEdit] = useState(false);
  const state = useContext(GlobalState);
  const [callbackAdmin, setCallbackAdmin] = state.callbackAdmin;
  const navigate = useNavigate();
  const vouchers = Voucher.vouchers && Voucher.vouchers;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...states, [name]: value });
  };
  useEffect(() => {
    if (id) {
      setOnEdit(true);
      Voucher.vouchers &&
        Voucher.vouchers.forEach((product) => {
          if (product._id == id) {
            setState(product);
          }
        });
    } else {
      setOnEdit(false);
      setState(initialState);
    }
  }, [id, vouchers]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        dispatch(UpdateVoucherInitial({ token, id, title, value }));
      } else {
        dispatch(CreateVoucherInitial({ token, id, title, value }));
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  useEffect(() => {
    if (onEdit) {
      if (updateVoucher.status === 200) {
        setCallbackAdmin(!callbackAdmin);
        navigate("/Voucher");
        swal(updateVoucher.msg, {
          icon: "success",
        });
        dispatch(reset());
      } else if (updateVoucher.status === 400) {
        swal(updateVoucher.msg, {
          icon: "error",
        });
        dispatch(reset());
      }
    } else {
      if (createVoucher.status === 200) {
        setCallbackAdmin(!callbackAdmin);
        navigate("/Voucher");
        swal(createVoucher.msg, {
          icon: "success",
        });
        dispatch(reset());
      } else if (createVoucher.status === 400) {
        swal(createVoucher.msg, {
          icon: "error",
        });
        dispatch(reset());
      }
    }
  }, [createVoucher, updateVoucher, onEdit]);
  return (
    <>
      {onEdit ? (
        <MetaData title={`Edit-Voucher-${states._id}`} />
      ) : (
        <MetaData title="Add Voucher" />
      )}
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={handleSubmit}>
          <div className="content-header">
            <Link to="/voucher" className="btn btn-danger text-white">
              Go to Voucher
            </Link>
            <h2 className="content-title">
              {onEdit ? "Edit Voucher" : "Create Voucher"}
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
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={states.title}
                      name="title"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      value
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={states.value}
                      name="value"
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

export default MainCreateVoucher;
