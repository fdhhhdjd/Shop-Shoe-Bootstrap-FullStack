const mongoose = require("mongoose");
const crypto = require("crypto");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    image: {
      type: Object,
      default: {
        public_id: "121313112",
        url: "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
      },
    },
    cart: {
      type: Array,
      default: [],
    },
    total_cart: {
      type: Number,
      default: 0,
    },
    voucher: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    phone_number: {
      type: String,
      default: "",
      required: false,
      trim: true,
    },
    sex: {
      type: Number,
      required: false,
      trim: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    date_of_birth: {
      type: String,
      default: "",
      required: false,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },

  { timestamps: true }
);
UserSchema.methods.getResetPasswordToken = function () {
  //! tạo mã thông báo
  const resetToken = crypto.randomBytes(20).toString("hex");

  //! Thêm resetPasswordToken vào userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", UserSchema);
