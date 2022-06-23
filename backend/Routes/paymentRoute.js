const router = require("express").Router();
const paymentCtrl = require("../Controllers/PaymentCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
router
  .route("/payments")
  .get(auth, authAdmin, paymentCtrl.getPayments)
  .post(auth, paymentCtrl.createPayment);

//Get Delete Payment User Deleted

router.get("/deletePayment", paymentCtrl.getPaymentDeletes);

//Check Pass then Delete Payment
router.post("/checkPass", auth, paymentCtrl.CheckPassDelete);

//Delete Payment User Deleted
router.patch("/deletePayments/:id", paymentCtrl.DeletePaymentSoftErase);
router.patch("/undoPayments/:id", paymentCtrl.UndoPaymentSoftErase);

//Id Payment
router.get("/payments/:id", auth, authAdmin, paymentCtrl.getIdPayment);

//Update order status
router.patch(
  "/update/order_status/:id",
  auth,
  authAdmin,
  paymentCtrl.updateOrderStatus
);

//3 Day buy user
router.route("/newPayment").get(auth, authAdmin, paymentCtrl.UserNewBuyPayment);

//Get sum of income
router.get("/sumOfIncome", auth, authAdmin, paymentCtrl.getSumOfIncome);

//Get income of orders customer received this month and compare to last month
router.get(
  "/orders/customerReceived/getIncomeThisMonthAndCompareTo",
  auth,
  authAdmin,
  paymentCtrl.getIncomeCustomerReceivedThisAndLastMonth
);

//Get income of orders customer have not received this month and compare to last month
router.get(
  "/orders/customerNotReceived/getIncomeThisMonthAndCompareTo",
  auth,
  authAdmin,
  paymentCtrl.getIncomeCustomerNotReceivedThisAndLastMonth
);

//Get monthly income of orders customer received
router.get(
  "/orders/customerReceived/getMonthlyIncome",
  paymentCtrl.getMonthlyIncomeCustomerReceived
);
//Payment Stripe
router.post("/paymentStripe", paymentCtrl.StripePayments);

module.exports = router;
