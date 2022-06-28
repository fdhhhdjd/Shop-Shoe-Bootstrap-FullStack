const dotenv = require("dotenv");
const express = require("express");
const REDIS = require("../configs/Redis");
const Users = require("../Model/userModel");
dotenv.config({ path: "../../.env" });
const connectDB = require("../configs/db");
connectDB();
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "../../.env" });
}
const app = express();
REDIS.psubscribe("__keyevent@0__:expired");
REDIS.on("pmessage", async (pattern, channel, message) => {
  console.log(`message:::::`, message);
  console.log("Sau khi chung ta co orderID:::", message);
  //Update trong BD la orderID chua thanh toan...
  try {
    await Users.findOneAndUpdate(
      { _id: message },
      {
        cart: [],
      }
    );
  } catch (error) {
    console.log(error);
  }
});

app.listen(process.env.PORTREDIS || 3010, () => {
  console.log(`EventListener is running 3010`);
});
