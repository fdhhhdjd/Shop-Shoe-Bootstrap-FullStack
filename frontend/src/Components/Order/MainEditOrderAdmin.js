import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { GlobalState } from "../../Context/GlobalState";
import { MetaData, SwaleMessage } from "../../imports/index";
import { reset, UpdatePaymentStatusInitial } from "../../Redux/OrderSlice";
const initialState = {
  order_status: "",
};
const MainEditOrderAdmin = () => {
  const [states, setState] = useState(initialState);
  const { order, editStatusPayment } = useSelector((state) => ({
    ...state.order,
  }));
  const { order_status } = states;
  const dispatch = useDispatch();
  const { refreshTokenAdmin } = useSelector((state) => ({
    ...state.admin,
  }));
  const token = refreshTokenAdmin.accessToken && refreshTokenAdmin.accessToken;
  const { id } = useParams();
  const state = useContext(GlobalState);
  const [callbackAdmin, setCallbackAdmin] = state.callbackAdmin;
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...states, [name]: value });
  };
  useEffect(() => {
    if (id) {
      order.forEach((product) => {
        if (product._id == id) {
          setState(product);
        }
      });
    } else {
      setState(initialState);
    }
  }, [id, order]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(UpdatePaymentStatusInitial({ token, id, order_status }));
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  useEffect(() => {
    if (editStatusPayment.status === 200) {
      setCallbackAdmin(!callbackAdmin);
      navigate("/orders");
      SwaleMessage(editStatusPayment.msg, "success");
      dispatch(reset());
    } else if (editStatusPayment.status === 400) {
      SwaleMessage(editStatusPayment.msg, "error");
      dispatch(reset());
    }
  }, [editStatusPayment]);

  return (
    <>
      <MetaData title={`Edit-Oder-${states.order_status}`} />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={handleSubmit}>
          <div className="content-header">
            <Link to="/orders" className="btn btn-danger text-white">
              Go to Orders
            </Link>
            <h2 className="content-title">Edit Order</h2>
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
                    <label
                      htmlFor="product_price"
                      className="form-label"
                    ></label>
                    <select
                      className="form-control form-select"
                      onChange={handleChange}
                      name="order_status"
                      value={states.order_status}
                    >
                      <option value="Delivered">Delivered</option>
                      <option value="On Delivery">On Delivery</option>
                      <option value="Ordered">Ordered</option>
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

export default MainEditOrderAdmin;
