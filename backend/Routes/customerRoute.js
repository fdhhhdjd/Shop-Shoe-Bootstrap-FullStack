const userCtrl = require("../Controllers/userController");
const auth = require("../middleware/auth");
const admin = require("../middleware/authAdmin");
const router = require("express").Router();
//!User
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
router.patch("/profile/update", auth, admin, userCtrl.updateProfile);

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
//History to Payment And Cart
router.get("/history", auth, userCtrl.historyCart);
//!Admin
//Register Admin
router.post("/registerAdmin", userCtrl.registerAdmin);

//RefreshToken Admin
router.get("/refreshTokenAdmin", userCtrl.refreshTokenAdmin);

//Login Admin
router.post("/loginAdmin", userCtrl.loginAdmin);

//Logout Admin
router.get("/logoutAdmin", userCtrl.LogoutAdmin);

//Forget Admin
router.post("/ForgetAdmin", userCtrl.ForgetAdmin);

module.exports = router;
