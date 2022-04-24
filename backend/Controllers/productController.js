const asyncHandler = require("express-async-handler");
const Products = require("../Model/ProductModel.js");
const Users = require("../Model/userModel");
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
        categories,
      } = req.body;
      if (!image)
        return res.json({
          status: 400,
          success: false,
          msg: "No image upload",
        });

      const newProduct = new Products({
        name,
        image,
        description,
        rating,
        price,
        countInStock,
        numReviews,
        categories,
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
        .sorting();

      const products = await features.query.populate("categories");
      res.json({
        status: 200,
        success: true,
        result: products.length,
        products: products,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //Get Product Id
  getIdProducts: async (req, res) => {
    const product = await Products.findById(req.params.id).populate({
      path: "reviews",
      populate: {
        path: "user",
      },
    });
    try {
      if (!product) {
        return res.status(404).json({
          status: 400,
          success: false,
          msg: "Product not found !!!",
        });
      }
      res.status(200).json({
        status: 200,
        success: true,
        msg: "Get Products Detail Successfully !",
        product,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //Update a product
  updateProduct: async (req, res) => {
    try {
      const {
        name,
        image,
        description,
        rating,
        price,
        countInStock,
        numReviews,
        categories,
      } = req.body;
      if (!image) return res.status(400).json({ msg: "No image upload" });
      await Products.findOneAndUpdate(
        { _id: req.params.id },
        {
          name,
          image,
          description,
          rating,
          price,
          countInStock,
          numReviews,
          categories,
        }
      );
      res.status(200).json({
        status: 200,
        success: true,
        msg: "Updated a Product",
      });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //Delete Product
  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.status(200).json({
        status: 200,
        success: true,
        msg: "Deleted a Product",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //Review Product
  reviewProduct: async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Products.findById(req.params.id);

    if (product) {
      const alreadyReviewed = await product.reviews.find(
        (r) => r.user.toString() === req.user.id.toString()
      );

      if (alreadyReviewed) {
        return res.json({
          status: 400,
          success: false,
          msg: "Product already Reviewed",
        });
      }
      const data = await Users.find({ _id: req.user.id });

      const review = {
        rating: Number(rating),
        comment,
        user: req.user.id,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(200).json({
        status: 200,
        success: true,
        message: "Reviewed Added Successfully 😁",
      });
    }
  },

  updateReviewProduct: async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.productId;
    const commentId = req.params.commentId;
    const { comment } = req.body;
    const product = await Products.findById({ _id: productId });

    try {
      if (product) {
        for (var i = 0; i < product.reviews.length; i++) {
          if (
            product.reviews[i]._id == commentId &&
            product.reviews[i].user == userId
          ) {
            product.reviews[i].comment = comment;
          }
        }
      }
      await Products.findByIdAndUpdate(
        { _id: req.params.productId },

        {
          updatedAt: Date.now,
        }
      );
      await product.save();
      return res.json({
        status: 200,
        success: true,
        msg: "Update Comment Successfully 😅",
      });
    } catch (error) {
      console.log(error);
    }
  },
  //Delete Product
  deleteReviewProduct: async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.productId;
    const commentId = req.params.commentId;
    const product = await Products.findById({ _id: productId });

    try {
      if (product) {
        for (var i = 0; i < product.reviews.length; i++) {
          if (
            product.reviews[i]._id == commentId &&
            product.reviews[i].user == userId
          ) {
            product.reviews.splice(i, 1);
          }
        }

        product.numReviews = product.reviews.length;

        if (product.reviews.length === 0) {
          product.rating = 0;
        } else {
          product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.reviews.length;
        }
      }
      await product.save();
      return res.json({
        status: 200,
        success: true,
        msg: "Delete Comment Successfully 😅",
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = productCtrl;
