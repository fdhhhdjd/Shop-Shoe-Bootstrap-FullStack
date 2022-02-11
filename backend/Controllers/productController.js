const Products = require("../Model/ProductModel.js");
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
const productCtrl = {
  //Create Product
  createProduct: async (req, res) => {
    try {
      const {
        name,
        image,
        description,
        rating,
        price,
        countInStock,
        numReviews,
      } = req.body;
      if (!image) return res.status(400).json({ msg: "No image upload" });

      const newProduct = new Products({
        name,
        image,
        description,
        rating,
        price,
        countInStock,
        numReviews,
      });

      await newProduct.save();
      res.json({
        status: 200,
        success: true,
        msg: "Create Product Successfully",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //Get All Product
  getProducts: async (req, res) => {
    try {
      const features = new APIfeatures(Products.find(), req.query)
        .filtering()
        .sorting()
        .paginating();

      const products = await features.query;

      res.json({
        status: "success",
        result: products.length,
        products: products,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
module.exports = productCtrl;
