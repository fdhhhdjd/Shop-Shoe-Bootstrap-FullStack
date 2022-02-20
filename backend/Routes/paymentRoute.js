const router = require("express").Router();
const paymentCtrl = require("../Controllers/PaymentCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
router
  .route("/payments")
  .get(auth, authAdmin, paymentCtrl.getPayments)
  .post(auth, paymentCtrl.createPayment);

//Get Delete Payment User Deleted

router.get("/deletePayment", auth, authAdmin, paymentCtrl.getPaymentDeletes);
//Delete Payment User Deleted
router.patch(
  "/deletePayments/:id",
  auth,
  authAdmin,
  paymentCtrl.DeletePaymentSoftErase
);
router.patch(
  "/undoPayments/:id",
  auth,
  authAdmin,
  paymentCtrl.UndoPaymentSoftErase
);

//Id Payment
router.get("/payments/:id", auth, authAdmin, paymentCtrl.getIdPayment);

//3 Day buy user
router.route("/newPayment").get(auth, authAdmin, paymentCtrl.UserNewBuyPayment);

module.exports = router;
