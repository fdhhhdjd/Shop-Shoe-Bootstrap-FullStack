import React from "react";
import { TopTotal } from "../../imports/index";
const MainHomeAdmin = () => {
  return (
    <>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title"> Dashboard </h2>
        </div>
        {/* Top Total */}
        {/* <TopTotal orders={orders} products={products} /> */}

        <div className="row">
          {/* STATICS */}
          {/* <SaleStatistics />
          <ProductsStatistics /> */}
        </div>

        {/* LATEST ORDER */}
        <div className="card mb-4 shadow-sm">
          {/* <LatestOrder orders={orders} loading={loading} error={error} /> */}
        </div>
      </section>
    </>
  );
};

export default MainHomeAdmin;
