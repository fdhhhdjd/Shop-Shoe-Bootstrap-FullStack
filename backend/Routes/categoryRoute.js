const router = require("express").Router();
const categoryCtrl = require("../Controllers/categoryController");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
  .route("/categorys")
  .get(categoryCtrl.getCategories)
  .post(auth, authAdmin, categoryCtrl.createCategory);
router
  .route("/categorys/:id")
  .delete(auth, authAdmin, categoryCtrl.deleteCategory)
  .patch(auth, authAdmin, categoryCtrl.updateCategory);

module.exports = router;
