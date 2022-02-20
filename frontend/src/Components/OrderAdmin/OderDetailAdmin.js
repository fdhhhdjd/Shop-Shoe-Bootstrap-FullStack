import React, { useEffect } from "react";
import { OrderDetailMain, Sidebar, HeaderAdmin } from "../../imports/index";
import { useParams } from "react-router-dom";
import { GetIdOrderInitial, reset } from "../../Redux/OrderSlice";
import { useSelector, useDispatch } from "react-redux";

const OderDetailAdmin = () => {
  const { id } = useParams();
  const { refreshTokenAdmin } = useSelector((state) => ({
    ...state.admin,
  }));
  const tokens = refreshTokenAdmin.accessToken;

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(GetIdOrderInitial({ id, tokens }));
    }
    return () => {
      dispatch(reset());
    };
  }, [id]);
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <HeaderAdmin />
        <OrderDetailMain orderId={id} />
      </main>
    </>
  );
};

export default OderDetailAdmin;
