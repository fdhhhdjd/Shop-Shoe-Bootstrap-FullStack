const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const path = require("path");
app.enable("trust proxy");
const bodyParser = require("body-parser");
const compression = require("compression");
// const cron = require("node-cron");
const CronAdminController = require("./Controllers/CronController");

app.use(
  compression({
    level: 6,
    threshold: 100 * 1000,
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);
app.use(
  express.json({
    verify: (req, res, buffer) => (req["rawBody"] = buffer),
  })
);
//!router import
const customer = require("./Routes/customerRoute.js");
const product = require("./Routes/ProductRoute.js");
const payment = require("./Routes/paymentRoute.js");
const category = require("./Routes/categoryRoute");
const upload = require("./Routes/UploadCloud.js");
const vouchers = require("./Routes/voucherRoute.js");
const carousel = require("./Routes/carouselRoute.js");
const feedback = require("./Routes/feedbackRoute");

//!Link router Main

//Auhthenticate customer
app.use("/api/auth", customer);
app.use("/api/product", product);
app.use("/api/payment", payment);
app.use("/api/category", category);
app.use("/api/voucher", vouchers);
app.use("/api/carousel", carousel);
app.use("/api/feedback", feedback);

//! Run Cron
// cron.schedule("*/5 * * * *", function () {
//   CronAdminController.GetAllUserUnCheck();
// });
//!upload
app.use("/api", upload);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

//!Middleware for error
module.exports = app;
