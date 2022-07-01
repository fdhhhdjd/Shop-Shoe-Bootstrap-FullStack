import {
  HeaderAdmin,
  MainProduct,
  MetaData,
  Sidebar,
} from "../../imports/index";
const Products = () => {
  return (
    <>
      <Sidebar />
      <MetaData title="Manager-Product" />
      <main className="main-wrap">
        <HeaderAdmin />
        <MainProduct />
      </main>
    </>
  );
};

export default Products;
