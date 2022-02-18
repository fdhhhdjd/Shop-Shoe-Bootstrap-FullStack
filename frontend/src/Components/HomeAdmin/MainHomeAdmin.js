import React from "react";
import { useSelector } from "react-redux";
import {
  TopTotal,
  SaleStatistics,
  LatestOrder,
  ProductsStatistics,
} from "../../imports/index";
const MainHomeAdmin = () => {
  const { order, loading, error } = useSelector((state) => ({
    ...state.order,
  }));
  const { product } = useSelector((state) => ({ ...state.products }));
  const products = product.products;
  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title"> Dashboard </h2>
        </div>
        {/* Top Total */}
        <TopTotal orders={order} products={products} />

        <div className="row">
          {/* STATICS */}
          <SaleStatistics />
          <ProductsStatistics />
        </div>

        {/* LATEST ORDER */}
        <div className="card mb-4 shadow-sm">
          <LatestOrder orders={order} loading={loading} error={error} />
        </div>
      </section>
    </>
  );
};

export default MainHomeAdmin;
