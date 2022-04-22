const userCtrl = require("../Controllers/userController");
const adminCtrl = require("../Controllers/adminController");
const auth = require("../middleware/auth");
const admin = require("../middleware/authAdmin");
const router = require("express").Router();
//!User
//Register
router.post("/register", userCtrl.register);

//Email verify
router.get("/verify/:userId/:uniqueString", userCtrl.verifyEmail);

//Login
router.post("/login", userCtrl.login);

//Login
router.post("/loginPhone", userCtrl.loginPhone);

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

//Change Password
router.patch("/changePasswordGgFb", auth, userCtrl.ChangePassWordLoginGgFb);

//ForGet
router.post("/forget", userCtrl.forgetPassword);

//Reset password
router.put("/password/reset/:token", userCtrl.resetPassword);

//Login Google
router.post("/loginGoogle", userCtrl.LoginGoogle);

//Login Facebook
router.post("/loginFacebook", userCtrl.LoginFacebook);

//Add To Cart
router.patch("/addcart", auth, userCtrl.addCart);

//History to Payment And Cart
router.get("/history", auth, userCtrl.historyCart);
//!Admin
//Register Admin
router.post("/registerAdmin", adminCtrl.registerAdmin);

//RefreshToken Admin
router.get("/refreshTokenAdmin", adminCtrl.refreshTokenAdmin);

//Login Admin
router.post("/loginAdmin", adminCtrl.loginAdmin);

//Logout Admin
router.get("/logoutAdmin", adminCtrl.LogoutAdmin);

//Forget Admin
router.post("/ForgetAdmin", adminCtrl.ForgetAdmin);

//Login Google
router.post("/loginGoogleAdmin", adminCtrl.loginGoogleAdmin);

//Get All Users
router.get("/getAllUser", auth, admin, adminCtrl.GetAllUser);

//Get All unCheck
router.get("/getAllUserUncheck", auth, admin, adminCtrl.GetAllUserUnCheck);

//Update User or Admin
router.patch("/updateUserAdmin/:id", auth, admin, adminCtrl.updateUserOrAdmin);

//Delete User or Admin
router.delete("/deleteUserAdmin/:id", auth, admin, adminCtrl.deleteUserOrAdmin);

//Get New User 3 Day
router.get("/getUserDay", auth, admin, adminCtrl.getUserAllday);

//Get All Admin
router.get("/getAllAdmin", auth, admin, adminCtrl.GetAllAdmin);

module.exports = router;
