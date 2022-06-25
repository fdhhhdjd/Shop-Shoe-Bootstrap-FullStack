import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  CompareTotal,
  CompareTotalNotReceived,
  LatestOrder,
  LatestUser,
  ProductsStatistics,
  SaleStatistics,
  TopTotal,
} from "../../imports/index";
import PaymentOrderTwelve from "./PaymentOrderTwelve";
const MainHomeAdmin = () => {
  const { order, newUserBuy, loading, error } = useSelector((state) => ({
    ...state.order,
  }));
  const { product } = useSelector((state) => ({ ...state.products }));
  const [orders, setOrders] = useState();
  const products = product.products;
  useEffect(() => {
    if (newUserBuy) {
      const orders = newUserBuy.result;
      setOrders(orders);
    }
  }, [newUserBuy]);

  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title"> Dashboard </h2>
        </div>
        {/* Top Total */}
        <TopTotal orders={order} products={products} />
        <div className="content-header">
          <h4 className="content-title"> Compare Received</h4>
        </div>
        {/* Compare Received<*/}
        <CompareTotal />

        <div className="content-header">
          <h4 className="content-title"> Compare Not Received</h4>
        </div>
        {/* Compare Received<*/}
        <CompareTotalNotReceived />

        <div className="row">
          {/* STATICS */}
          <SaleStatistics />
          <ProductsStatistics />
        </div>
        {/* 12Moth */}
        <div className="row">
          <PaymentOrderTwelve />
        </div>
        {/* LATEST ORDER */}
        <div className="card mb-4 shadow-sm">
          <LatestOrder orders={orders} loading={loading} error={error} />
        </div>

        <div className="card mb-4 shadow-sm">
          <LatestUser />
        </div>
      </section>
    </>
  );
};

export default MainHomeAdmin;
