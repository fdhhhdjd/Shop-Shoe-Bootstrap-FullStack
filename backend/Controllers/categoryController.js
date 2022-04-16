const Category = require("../Model/CategoryModel");
const Products = require("../Model/ProductModel");
const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json({
        status: 200,
        success: true,
        categories,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      const { name, image } = req.body;

      const category = await Category.findOne({ name });
      if (category)
        return res.json({
          status: 400,
          success: false,
          msg: "This category already exists.",
        });
      if (!image)
        return res.json({
          status: 400,
          success: false,
          msg: "No image upload",
        });
      const newCategory = new Category({ name, image });
      await newCategory.save();
      res.json({
        status: 200,
        success: true,
        msg: "Created a category",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const category = await Category.findById({ _id: req.params.id });
      if (!category) {
        return res.json({
          status: 400,
          success: false,
          msg: "Not found category",
        });
      }
      const products = await Products.findOne({ categories: req.params.id });
      if (products)
        return res.json({
          status: 400,
          success: false,
          msg: "Please delete all products with a relationship.",
        });

      await Category.findByIdAndDelete(req.params.id);
      res.json({
        status: 200,
        success: true,
        msg: "Deleted a Category",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name, image } = req.body;
      if (!image)
        return res.json({
          status: 400,
          success: false,
          msg: "No image upload",
        });
      // const category = await Category.findOne({ name });
      // if (category)
      //   return res.json({
      //     status: 400,
      //     success: false,
      //     msg: "This category already exists.",
      //   });

      await Category.findOneAndUpdate({ _id: req.params.id }, { name, image });

      res.json({
        success: true,
        status: 200,
        msg: "Updated a category",
      });
    } catch (err) {
      return res.json({
        status: 500,
        success: false,
        msg: err.message,
      });
    }
  },
};

module.exports = categoryCtrl;
