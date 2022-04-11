const userCtrl = require("../Controllers/userController");
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

//Login Facebook
router.post("/loginFacebook", userCtrl.LoginFacebook);

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

//Login Google
router.post("/loginGoogleAdmin", userCtrl.loginGoogleAdmin);

//Get All Users
router.get("/getAllUser", auth, admin, userCtrl.GetAllUser);

//Get All unCheck
router.get("/getAllUserUncheck", auth, admin, userCtrl.GetAllUserUnCheck);

//Update User or Admin
router.patch("/updateUserAdmin/:id", auth, admin, userCtrl.updateUserOrAdmin);

//Delete User or Admin
router.delete("/deleteUserAdmin/:id", auth, admin, userCtrl.deleteUserOrAdmin);

//Get New User 3 Day
router.get("/getUserDay", auth, admin, userCtrl.getUserAllday);

//Get All Admin
router.get("/getAllAdmin", auth, admin, userCtrl.GetAllAdmin);

module.exports = router;
