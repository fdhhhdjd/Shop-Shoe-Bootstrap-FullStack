const productCtrl = require("../Controllers/productController");
const router = require("express").Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
//Create Product
router.post("/create", auth, authAdmin, productCtrl.createProduct);
//Get All Product
router.get("/getAll", productCtrl.getProducts);
//Get Id Product
router.get("/getId/:id", productCtrl.getIdProducts);
//Update Product
router.put("/update/:id", auth, authAdmin, productCtrl.updateProduct);
//Delete Product
router.delete("/delete/:id", auth, authAdmin, productCtrl.deleteProduct);
//review product
router.post("/review/:id", auth, productCtrl.reviewProduct);
//Delete product
router.delete("/delete/review", auth, productCtrl.deleteReviewProduct);

module.exports = router;
