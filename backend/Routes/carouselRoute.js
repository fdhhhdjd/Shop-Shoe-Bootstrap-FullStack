const router = require("express").Router();
const carouselCtrl = require("../Controllers/carouselController");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
  .route("/carousels")
  .get(carouselCtrl.getCarousels)
  .post(auth, authAdmin, carouselCtrl.createCarousel);
router
  .route("/carousels/:id")
  .delete(auth, authAdmin, carouselCtrl.deleteCarousel)
  .patch(auth, authAdmin, carouselCtrl.updateCarousel);

module.exports = router;
