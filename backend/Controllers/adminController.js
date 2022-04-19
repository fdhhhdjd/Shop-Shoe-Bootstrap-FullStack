const Users = require("../Model/userModel");
const UserVerifications = require("../Model/userVerificationModel");
const Payments = require("../Model/PaymentModel");
const Products = require("../Model/ProductModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const sendEmail = require("./SendEmail");
const CLIENT_ID = process.env.GOOGLE_CLIENT_IDS;
const client = new OAuth2Client(CLIENT_ID);
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const STORAGE = require("../utils/Storage");
const CONSTANTS = require("../configs/contants");
const HELPER = require("../utils/helper");
require("dotenv").config;

const adminCtrl = {
  //!Admin

  //Register Admin
  registerAdmin: async (req, res) => {
    try {
      const { name, email, password, sex, date_of_birth, phone_number } =
        req.body;

      const user = await Users.findOne({ email, role: 1 });
      if (user)
        return res.json({
          status: 400,
          success: false,
          msg: "The email already exists",
        });

      if (password.length < 6)
        return res.json({
          status: 400,
          success: false,
          msg: "Password is at least 6 characters long.",
        });

      //kiểm tra format password
      const reg=HELPER.isPassword(password)
      if (!reg) {
        return res.json({
          status: 400,
          success: false,
          message:
            "Password must contain at least one number and one uppercase and lowercase and special letter, and at least 6 or more characters ",
        });
      }
      if(isNaN(phone_number)){
        return res.json({
          status: 400,
          success: false,
          msg: "Phone is must be number.",
        });
      }
      const CheckPhone=HELPER.isVietnamesePhoneNumber(phone_number)
      if (CheckPhone===false) {
        return res.json({
          status: 400,
          success: false,
          msg: "Incorrect phone number.",
        });
      }

      // Password Encryption
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
        role: 1,
        sex,
        date_of_birth,
        phone_number,
      });

      // Save mongodb
      await newUser.save();

      //url to be used in the email
      const resetPasswordUrl = `${req.protocol}://${req.get("host")}/`;
      const currentUrl = resetPasswordUrl;
      const uniqueString = uuidv4() + newUser.id;

      //hash unique string
      const hashedUniqueString = await bcrypt.hash(uniqueString, 10);

      const newVerification = new UserVerifications({
        userId: newUser.id,
        uniqueString: hashedUniqueString,
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000,
      });

      await newVerification.save();

      //send email verification
      await sendEmail({
        from: process.env.SMPT_MAIL,
        to: email,
        subject: `Verify Your Email`,
        html: `<p>Verify your email address to complete the signup and login into your account.</p><p>This link <b>expires in 6 hours</b>.</p><p>Press <a href= ${
          currentUrl + "api/auth/verify/" + newUser.id + "/" + uniqueString
        }>here</a> to proceed.</p>`,
      });

      return res.json({
        status: 200,
        success: true,
        msg: "Verification email sent to your email",
      });
    } catch (err) {
      return res.json({
        status: 400,
        success: false,
        msg: err.message,
      });
    }
  },

  //RefreshToken Admin
  refreshTokenAdmin: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token)
        return res.json({
          status: 400,
          success: false,
          msg: "Please Login or Register",
        });

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err)
          return res.json({
            status: 400,
            success: false,
            msg: "Please Login or Register Admin",
          });

        const accesstoken = STORAGE.createAccessToken({
          id: user.id,
          role: user.role,
        });
        res.json({
          status: 200,
          success: true,
          msg: "Login Admin Successfully 😉",
          accessToken: accesstoken,
        });
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        success: false,
        msg: err,
      });
    }
  },

  //Login Admin
  loginAdmin: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email: email, role: 1 });
      if (!user)
        return res.json({
          status: 400,
          success: false,
          msg: "Admin does not exist.",
        });

      if (user.verified === false) {
        return res.json({
          status: 400,
          success: false,
          msg: "Email hasn't been verified. Please check email inbox",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.json({
          status: 400,
          success: false,
          msg: "Incorrect password.",
        });

      // If login success , create access token and refresh token
      const accessToken = STORAGE.createAccessToken({
        id: user._id,
        role: user.role,
      });
      const refreshtoken = STORAGE.createRefreshToken({
        id: user._id,
        role: user.role,
      });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/api/auth/refreshTokenAdmin",
        maxAge: CONSTANTS._7_DAY, // 7d
      });

      res.status(200).json({
        status: 200,
        success: true,
        accessToken,
        msg: "Login Admin Successfully 😍 !",
      });
    } catch (err) {
      return res.json({
        status: 400,
        success: false,
        msg: err,
      });
    }
  },

  //Logout Admin
  LogoutAdmin: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", {
        path: "/api/auth/refreshTokenAdmin",
      });
      return res.json({
        status: 200,
        success: true,
        msg: "Logged Out Admin Success",
      });
    } catch (err) {
      return res.json({
        status: 400,
        msg: err,
      });
    }
  },

  //Forget Admin
  ForgetAdmin: async (req, res) => {
    const user = await Users.findOne({ email: req.body.email, role: 1 });
    const { email } = req.body;
    if (!email) {
      res.json({
        status: 400,
        success: false,
        msg: "Email are not empty. ",
      });
    }
    if (!user) {
      res.json({
        status: 400,
        success: false,
        msg: "Account Admin Not Exit",
      });
    }
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: CONSTANTS.DELETED_DISABLE });

    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/admin/reset/${resetToken}`;
    // const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/admin/reset/${resetToken}`;
    //const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
    try {
      await sendEmail({
        from: process.env.SMPT_MAIL,
        to: email,
        subject: `Forgot Password`,
        template: "forgot-password",
        attachments: [
          {
            filename: "netflix.jpg",
            path: path.resolve("./views", "images", "netflix.jpg"),
            cid: "netflix_logo",
          },
          {
            filename: "question.png",
            path: path.resolve("./views", "images", "question.png"),
            cid: "question_img",
          },
        ],
        context: {
          resetPasswordUrl,
        },
      });

      return res.status(200).json({
        status: 200,
        success: true,
        msg: `Email sent to Admin ${user.email} successfully`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: CONSTANTS.DELETED_ENABLE });
      console.log(error);
    }
  },

  //Login Google Admin
  loginGoogleAdmin: async (req, res) => {
    const { tokenId } = req.body;
    client
      .verifyIdToken({
        idToken: tokenId,
        audience: process.env.CLIENT_ID,
      })
      .then((response) => {
        const { email_verified, name, email, picture } = response.payload;
        console.log(response.payload);
        if (email_verified) {
          Users.findOne({ email, role: 1 }).exec((error, user) => {
            if (error) {
              return res.json({
                status: 400,
                success: false,
                msg: "Invalid Authentication",
              });
            } else {
              if (user) {
                const accesstoken = STORAGE.createAccessToken({
                  id: user._id,
                  role: user.role,
                });
                const refreshtoken = STORAGE.createRefreshToken({
                  id: user._id,
                  role: user.role,
                });

                res.cookie("refreshtoken", refreshtoken, {
                  httpOnly: true,
                  path: "/api/auth/refreshTokenAdmin",
                  maxAge: CONSTANTS._7_DAY, // 7d
                });
                const { _id, name, email, image } = user;
                res.json({
                  status: 200,
                  success: true,
                  msg: "Login Admin successfully",
                  accesstoken,
                  user: { _id, name, email, image },
                });
              } else {
                let password = email + process.env.ACCESS_TOKEN_SECRET;
                let newUser = new Users({
                  name: name,
                  email,
                  password,
                  image: {
                    public_id: password,
                    url: picture,
                  },
                  role: 1,
                  verified: true,
                });
                newUser.save((err, data) => {
                  if (err) {
                    return res.json({
                      status: 400,
                      success: false,
                      msg: "Account No Admin invalid",
                    });
                  }
                  const accesstoken = STORAGE.createAccessToken({
                    id: data._id,
                    role: data.role,
                  });
                  const refreshtoken = STORAGE.createRefreshToken({
                    id: data._id,
                    role: data.role,
                  });

                  res.cookie("refreshtoken", refreshtoken, {
                    httpOnly: true,
                    path: "/api/auth/refreshTokenAdmin",
                    maxAge: CONSTANTS._7_DAY, // 7d
                  });
                  const { _id, name, email, image } = newUser;
                  res.json({
                    status: 200,
                    success: true,
                    msg: "Register Admin successfully",
                    accesstoken,
                    user: { _id, name, email, image },
                  });
                  console.log(user);
                });
              }
            }
          });
        }
      });
  },

  //Get all User
  GetAllUser: async (req, res) => {
    try {
      const user = await Users.find({
        role: 0,
        verified: CONSTANTS.DELETED_ENABLE,
      }).select("-password");
      res.json({
        status: 200,
        success: true,
        user,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  //Get all Uncheck User
  GetAllUserUnCheck: async (req, res) => {
    try {
      const data = await UserVerifications.find({
        expiresAt: { $lt: Date.now() },
      }).select("userId");

      const users = await Users.find({
        verified: CONSTANTS.DELETED_DISABLE,
      }).select("_id");

      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < users.length; j++) {
          if (data[i].userId == users[j].id) {
            await Users.deleteOne({ _id: users[j].id });
            await UserVerifications.deleteOne({ userId: data[i].userId });
          }
        }
      }

      const usersUncheck = await Users.find({
        verified: false,
        role: 0,
      }).select("-password");

      res.json({
        status: 200,
        success: true,
        user: usersUncheck,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  //Update User or Admin
  updateUserOrAdmin: async (req, res) => {
    try {
      const { name, image, phone_number, role, sex, date_of_birth } = req.body;
      if (!image)
        return res.json({
          status: 400,
          success: false,
          msg: "No image upload",
        });

      await Users.findOneAndUpdate(
        { _id: req.params.id },
        {
          name,
          image,
          phone_number,
          role,
          sex,
          date_of_birth,
        }
      );
      res.status(200).json({
        status: 200,
        success: true,
        msg: "Updated Successfully !",
      });
    } catch (err) {
      return res.json({
        status: 400,
        success: false,
        msg: err.message,
      });
    }
  },

  //Delete User or Admin
  deleteUserOrAdmin: async (req, res) => {
    try {
      await Users.findByIdAndDelete(req.params.id);
      const products = await Products.find({});
      for (var i = 0; i < products.length; i++) {
        for (var j = 0; j < products[i].reviews.length; j++) {
          if (products[i].reviews[j].user.toString() === req.params.id) {
            const a = products[i].reviews.slice(0, j);
            const b = products[i].reviews.slice(
              j + 1,
              products[i].reviews.length
            );
            const c = a.concat(b);
            products[i].reviews = c;
          }
        }
        products[i].numReviews = products[i].reviews.length;

        if (products[i].reviews.length === 0) {
          products[i].rating = 0;
        } else {
          products[i].rating =
            products[i].reviews.reduce((acc, item) => item.rating + acc, 0) /
            products[i].reviews.length;
        }
        await products[i].save();
      }

      await Payments.deleteMany({
        user_id: req.params.id,
      });

      res.status(200).json({
        status: 200,
        success: true,
        msg: "Deleted a Successfully !",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //Get New User 3 date
  getUserAllday: async (req, res) => {
    const GetDayNewUser = (d1, d2) => {
      let value1 = d1.getTime();
      let value2 = d2.getTime();
      return Math.ceil((value2 - value1) / CONSTANTS._1_DAY);
    };
    let user = await Users.find({
      role: 0,
      verified: CONSTANTS.DELETED_ENABLE,
    }).select("-password");

    var today = new Date();
    var result = [];
    for (var i = 0; i < user.length; i++) {
      var time = GetDayNewUser(user[i].createdAt, today);
      if (time <= 3) {
        result.push(user[i]);
      }
    }
    if (result.length === 0) {
      res.json({
        status: 200,
        success: true,
        msg: "No Account New  !!",
        result,
      });
    } else {
      res.json({
        status: 200,
        success: true,
        msg: "Get New User Successfully !!",
        result,
      });
    }
  },

  //Get all Admin
  GetAllAdmin: async (req, res) => {
    try {
      const user = await Users.find({
        role: 1,
        verified: CONSTANTS.DELETED_ENABLE,
      }).select("-password");
      res.json({
        status: 200,
        success: true,
        user,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = adminCtrl;
