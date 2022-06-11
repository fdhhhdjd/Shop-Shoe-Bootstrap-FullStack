const router = require("express").Router();
const auth = require("../middleware/auth.js");
const authAdmin = require("../middleware/authAdmin.js");
const feedbackCtrl = require("../Controllers/feedBackController.js");

//Xem tất cả phản hồi của khách hàng cho web
router.get("/all", auth, authAdmin, feedbackCtrl.getAllFeedback);

//Gửi email phản hồi cho web
router.post("/send", feedbackCtrl.sendFeedback);

//Search Feedback
router.post("/search", feedbackCtrl.SearchDateAndName);

//Reading Feedback
router.get("/reading/:id", feedbackCtrl.ReadingEmail);

//Filter email Seen not seen
router.post("/filterEmail", feedbackCtrl.FilterEmail);

//Admin trả lời feedback của khách hàng
router.post("/response/:id", auth, authAdmin, feedbackCtrl.responseFeedback);

module.exports = router;
