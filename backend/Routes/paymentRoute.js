const router = require("express").Router();
const paymentCtrl = require("../Controllers/PaymentCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
router
  .route("/payment")
  .get(auth, authAdmin, paymentCtrl.getPayments)
  .post(auth, paymentCtrl.createPayment);

module.exports = router;
