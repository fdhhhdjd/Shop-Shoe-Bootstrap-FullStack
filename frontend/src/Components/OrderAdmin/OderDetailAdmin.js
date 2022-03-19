import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { HeaderAdmin, OrderDetailMain, Sidebar } from "../../imports/index";
import { GetIdOrderInitial, reset } from "../../Redux/OrderSlice";

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
