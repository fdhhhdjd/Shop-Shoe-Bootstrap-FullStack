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

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password, sex, date_of_birth, phone_number } =
        req.body;

      const user = await Users.findOne({ email });

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
      let reg = new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$"
      ).test(password);
      if (!reg) {
        return res.json({
          status: 400,
          success: false,
          msg: "Password must contain at least one number and one uppercase and lowercase and special letter, and at least 6 or more characters ",
        });
      }

      // Password Encryption
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
        sex,
        date_of_birth,
        phone_number,
      });

      // Save mongodb
      await newUser.save();

      //url to be used in the email
      const resetPasswordUrl = `${req.protocol}://${req.get("host")}/`;
      // const currentUrl = resetPasswordUrl;
      const currentUrl = resetPasswordUrl;

      const uniqueString = uuidv4() + newUser.id;

      //hash unique string
      const hashedUniqueString = await bcrypt.hash(uniqueString, 10);
      console.log(hashedUniqueString);
      const newVerification = new UserVerifications({
        userId: newUser.id,
        uniqueString: hashedUniqueString,
        createdAt: Date.now(),
        expiresAt: Date.now() + 3600000,
      });

      await newVerification.save();
      const confirmEmailUrl =
        currentUrl + "api/auth/verify/" + newUser.id + "/" + uniqueString;
      //send email verification
      await sendEmail({
        from: process.env.SMPT_MAIL,
        to: email,
        subject: `Verify Your Email`,
        template: "confirm-email",
        attachments: [
          {
            filename: "netflix.png",
            path: path.resolve("./views", "images", "netflix.jpg"),
            cid: "netflix_logo",
          },
        ],
        context: {
          confirmEmailUrl,
        },
      });

      return res.json({
        status: 200,
        success: true,
        msg: `Verification email sent to ${email} `,
      });
    } catch (err) {
      return res.json({
        status: 400,
        success: false,
        msg: err.message,
      });
    }
  },

  //verify email
  verifyEmail: async (req, res) => {
    try {
      const { userId, uniqueString } = req.params;

      const userVerification = await UserVerifications.findOne({ userId });

      if (userVerification) {
        //if link expired then delete user
        const expiredAt = userVerification.expiresAt;
        const hashedUniqueString = userVerification.uniqueString;
        if (expiredAt < Date.now()) {
          await UserVerifications.deleteOne({ userId });
          await Users.deleteOne({ _id: userId });

          return res.json({
            status: 400,
            success: false,
            msg: "Link has expired. Please register again",
          });
        } else {
          const isMatch = await bcrypt.compare(
            uniqueString,
            hashedUniqueString
          );
          if (isMatch) {
            await Users.findOneAndUpdate(
              { _id: userId },
              {
                verified: CONSTANTS.DELETED_ENABLE,
                checkLogin: CONSTANTS.DELETED_ENABLE,
              }
            );

            await UserVerifications.deleteOne({ userId });

            return res.sendFile(path.resolve(__dirname, "../index.html"));
          } else {
            return res.json({
              status: 400,
              success: false,
              msg: "Link invalid, unique string is not match",
            });
          }
        }
      } else {
        return res.json({
          status: 400,
          success: false,
          msg: "Link is invalid because userid incorrect",
        });
      }
    } catch (error) {
      return res.json({
        status: 400,
        success: false,
        msg: error.message,
      });
    }
  },
  //refresh token
  refreshToken: (req, res) => {
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
            msg: "Please Login or Register",
          });

        const accesstoken = STORAGE.createAccessToken({
          id: user.id,
          role: user.role,
        });
        res.json({
          status: 200,
          success: true,
          msg: "Login Successfully 😉",
          accessToken: accesstoken,
        });
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        success: false,
        msg: err.message,
      });
    }
  },

  //Login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email: email, role: 0 });
      if (!user)
        return res.json({
          status: 400,
          success: false,
          msg: "User does not exist.",
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
      const accessToken = STORAGE.createAccessToken({ id: user._id });
      const refreshtoken = STORAGE.createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/api/auth/refresh_token",
        maxAge: CONSTANTS._7_DAY,
      });

      res.status(200).json({
        status: 200,
        success: true,
        accessToken,
        msg: "Login Successfully 😍 !",
      });
    } catch (err) {
      return res.json({
        status: 400,
        success: false,
        msg: err.message,
      });
    }
  },
  //Logout
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", {
        path: "/api/auth/refresh_token",
      });
      return res.status(200).json({
        status: 200,
        success: true,
        msg: "Logged out success",
      });
    } catch (err) {
      return res.json({
        status: 400,
        msg: err.message,
      });
    }
  },
  //Profile
  profile: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");
      if (!user)
        return res.json({
          status: 400,
          success: false,
          msg: "User does not exist.",
        });
      res.status(200).json({
        status: 200,
        success: true,
        user,
      });
    } catch (err) {
      return res.json({
        status: 400,
        msg: err.message,
      });
    }
  },

  //Update Profile
  updateProfile: async (req, res) => {
    try {
      const { name, image, phone_number, sex, date_of_birth } = req.body;
      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          name,
          image,
          phone_number,
          sex,
          date_of_birth,
        }
      );
      res.status(200).json({
        status: 200,
        success: true,
        msg: "Updated Profile Successfully !",
      });
    } catch (err) {
      return res.json({
        status: 400,
        msg: err.message,
      });
    }
  },

  //Change Password
  ChangePassword: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("+password");
      const { password, oldPassword, confirmPassword } = req.body;
      if (!password)
        return res.json({
          status: 400,
          success: false,
          msg: "Password are not empty.",
        });

      if (!confirmPassword)
        return res.json({
          status: 400,
          success: false,
          msg: " Confirm are not empty.",
        });

      if (!oldPassword)
        return res.json({
          status: 400,
          success: false,
          msg: "Old Password are not empty.",
        });

      if (password.length < 6)
        return res.json({
          status: 400,
          success: false,
          msg: "Password is at least 6 characters long.",
        });

      let reg = new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$"
      ).test(password);
      if (!reg) {
        return res.json({
          status: 400,
          success: false,
          msg: "Includes 6 characters, uppercase, lowercase and some and special characters.",
        });
      }
      if (confirmPassword !== password) {
        return res.json({
          status: 400,
          success: false,
          msg: "Password and confirm password does not match!",
        });
      }
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch)
        return res.json({
          status: 400,
          success: false,
          msg: " Old Password Incorrect",
        });
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      await Users.findByIdAndUpdate(
        { _id: user.id },
        { password: passwordHash },
        { new: true }
      );
      return res.status(200).json({
        status: 200,
        success: true,
        msg: "Change Password Successfully 😂!",
      });
    } catch (err) {
      return res.json({
        status: 400,
        msg: err.message,
      });
    }
  },

  //Forget
  forgetPassword: async (req, res) => {
    const user = await Users.findOne({ email: req.body.email, role: 0 });
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
        msg: "Account Not Exit",
      });
    }
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: CONSTANTS.DELETED_DISABLE });

    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetToken}`;
    // const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
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
        msg: `Email sent to ${user.email} successfully`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: CONSTANTS.DELETED_ENABLE });
      console.log(error);
    }
  },

  //Reset Password
  resetPassword: async (req, res) => {
    const { password, confirmPassword } = req.body;

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await Users.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.json({
        status: 400,
        success: false,
        msg: "Reset Password Token is invalid or has been expired",
      });
    }

    if (!password)
      return res.json({
        status: 400,
        success: false,
        msg: "Password are not empty.",
      });

    if (!confirmPassword)
      return res.json({
        status: 400,
        success: false,
        msg: " Confirm are not empty.",
      });

    if (password.length < 6)
      return res.json({
        status: 400,
        success: false,
        msg: "Password is at least 6 characters long.",
      });

    let reg = new RegExp(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$"
    ).test(password);
    if (!reg) {
      return res.json({
        status: 400,
        success: false,
        msg: "Includes 6 characters, uppercase, lowercase and some and special characters.",
      });
    }

    if (confirmPassword !== password) {
      return res.json({
        status: 400,
        success: false,
        msg: "Password and confirm password does not match!",
      });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(user.password, salt);
    await Users.findByIdAndUpdate(
      { _id: user.id },
      { password: passwordHash },
      { new: true }
    );
    res.status(200).json({
      status: 200,
      success: true,
      msg: "Reset successfully",
    });
  },

  //Login Google
  LoginGoogle: async (req, res) => {
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
          Users.findOne({ email, role: 0 }).exec((error, user) => {
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
                  path: "/api/auth/refresh_token",
                  maxAge: CONSTANTS._7_DAY, // 7d
                });
                const { _id, fullname, email, image } = user;
                res.json({
                  status: 200,
                  success: true,
                  msg: "Login successfully",
                  accesstoken,
                  user: { _id, fullname, email, image },
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
                  verified: true,
                });
                newUser.save((err, data) => {
                  if (err) {
                    return res.json({
                      status: 400,
                      success: false,
                      msg: "Invalid Authentication",
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
                    path: "/api/auth/refresh_token",
                    maxAge: CONSTANTS._7_DAY, // 7d
                  });
                  const { _id, name, email, image } = newUser;
                  res.json({
                    status: 200,
                    success: true,
                    msg: "Register successfully",
                    accesstoken,
                    user: { _id, name, email, image },
                  });
                });
              }
            }
          });
        }
      });
  },
  //Change password Login Google and Facebook
  ChangePassWordLoginGgFb: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("+password");
      const { password, confirmPassword } = req.body;
      if (!password)
        return res.json({
          status: 400,
          success: false,
          msg: "Password are not empty.",
        });

      if (!confirmPassword)
        return res.json({
          status: 400,
          success: false,
          msg: " Confirm are not empty.",
        });

      if (password.length < 6)
        return res.json({
          status: 400,
          success: false,
          msg: "Password is at least 6 characters long.",
        });

      let reg = new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$"
      ).test(password);
      if (!reg) {
        return res.json({
          status: 400,
          success: false,
          msg: "Includes 6 characters, uppercase, lowercase and some and special characters.",
        });
      }
      if (confirmPassword !== password) {
        return res.json({
          status: 400,
          success: false,
          msg: "Password and confirm password does not match!",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      await Users.findByIdAndUpdate(
        { _id: user.id },
        { password: passwordHash },
        { new: true }
      );
      return res.status(200).json({
        status: 200,
        success: true,
        msg: "Change Password Successfully 😂!",
      });
    } catch (err) {
      return res.json({
        status: 400,
        msg: err.message,
      });
    }
  },

  LoginFacebook: async (req, res) => {
    const { userID, accessToken } = req.body;
    let urlGraphFacebook = STORAGE.getURIFromTemplate(
      CONSTANTS.STORAGE_GRAPH_FACEBOOK,
      {
        userID,
        accessToken,
      }
    );
    fetch(urlGraphFacebook, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        const { email, name, picture } = response;
        Users.findOne({ email, role: 0 }).exec((error, user) => {
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
                path: "/api/auth/refresh_token",
                maxAge: CONSTANTS._7_DAY, // 7d
              });
              const { _id, name, email, image } = user;
              res.json({
                status: 200,
                success: true,
                msg: "Login successfully",
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
                  url: picture.data.url,
                },
                verified: true,
              });
              newUser.save((err, data) => {
                if (err) {
                  return res.json({
                    status: 400,
                    success: false,
                    msg: "Invalid Authentication",
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
                  path: "/api/auth/refresh_token",
                  maxAge: CONSTANTS._7_DAY, // 7d
                });
                const { _id, name, email, image } = newUser;
                res.json({
                  status: 200,
                  success: true,
                  msg: "Register successfully",
                  accesstoken,
                  user: { _id, name, email, image },
                });
              });
            }
          }
        });
      });
  },

  //Add to Cart
  addCart: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id);
      if (!user)
        return res.status(400).json({
          status: 400,
          success: false,
          msg: "User does not exist.",
        });

      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          cart: req.body.cart,
        }
      );
      return res
        .status(200)
        .json({ status: 200, success: true, msg: "Added to cart" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //Get all History
  historyCart: async (req, res) => {
    try {
      const history = await Payments.find({
        user_id: req.user.id,
        deleteAt: false,
      });
      res.json({
        status: 200,
        success: true,
        msg: "Get History Successfully",
        history,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = userCtrl;
