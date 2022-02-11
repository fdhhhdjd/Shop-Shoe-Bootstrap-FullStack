const productCtrl = require("../Controllers/productController");
const router = require("express").Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
//Create Product
router.post("/create", auth, authAdmin, productCtrl.createProduct);
//Get All Product
router.get("/getAll", productCtrl.getProducts);
module.exports = router;
