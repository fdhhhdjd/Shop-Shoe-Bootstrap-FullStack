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
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (category)
        return res.json({
          status: 400,
          success: false,
          msg: "This category already exists.",
        });

      const newCategory = new Category({ name });

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
      const products = await Products.findOne({ category: req.params.id });
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
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (category)
        return res.json({
          status: 400,
          success: false,
          msg: "This category already exists.",
        });
      await Category.findOneAndUpdate({ _id: req.params.id }, { name });

      res.json({
        success: true,
        status: 200,
        msg: "Updated a category",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = categoryCtrl;
