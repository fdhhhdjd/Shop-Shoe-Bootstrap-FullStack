const userCtrl = require("../Controllers/userController");
const auth = require("../middleware/auth");
const router = require("express").Router();
//Register
router.post("/register", userCtrl.register);

//Login
router.post("/login", userCtrl.login);

//refresh token
router.get("/refresh_token", userCtrl.refreshToken);

//Logout
router.get("/logout", userCtrl.logout);

// profile
router.get("/profile", auth, userCtrl.profile);

//Update Profile
router.patch("/profile/update", auth, userCtrl.updateProfile);

//Change Password
router.patch("/changePassword", auth, userCtrl.ChangePassword);

//ForGet
router.post("/forget", userCtrl.forgetPassword);

//Reset password
router.put("/password/reset/:token", userCtrl.resetPassword);

//Login Google
router.post("/loginGoogle", userCtrl.LoginGoogle);
//Add To Cart
router.patch("/addcart", auth, userCtrl.addCart);

module.exports = router;
