const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

//!router import
const customer = require("./Routes/customerRoute.js");
const product = require("./Routes/ProductRoute.js");
const payment = require("./Routes/paymentRoute.js");
const upload = require("./Routes/UploadCloud.js");

//!Link router Main

//Auhthenticate customer
app.use("/api/auth", customer);
app.use("/api/product", product);
app.use("/api", payment);

//!upload
app.use("/api", upload);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

//!Middleware for error
module.exports = app;
