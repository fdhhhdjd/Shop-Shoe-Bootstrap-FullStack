const router = require("express").Router();
const VoucherController = require("../Controllers/VoucherController");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
  .route("/vouchers")
  .get(VoucherController.getAllVoucher)
  .post(auth, authAdmin, VoucherController.createVoucher);
router
  .route("/vouchers/:id")
  .delete(auth, authAdmin, VoucherController.DeleteVoucher)
  .patch(auth, authAdmin, VoucherController.updateVoucher);
router.route("/totalCart").post(auth, VoucherController.TotalCart);
module.exports = router;
