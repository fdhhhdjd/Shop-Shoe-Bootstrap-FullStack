const router = require("express").Router();
const paymentCtrl = require("../Controllers/PaymentCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
router
  .route("/payments")
  .get(auth, authAdmin, paymentCtrl.getPayments)
  .post(auth, paymentCtrl.createPayment);

//Id Payment
router.get("/payments/:id", auth, authAdmin, paymentCtrl.getIdPayment);

//3 Day buy user
router.route("/newPayment").get(auth, authAdmin, paymentCtrl.UserNewBuyPayment);

module.exports = router;
