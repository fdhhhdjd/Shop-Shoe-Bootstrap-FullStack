const Carousel = require("../Model/CarouselModel");
const CarouselCtrl = {
  getCarousels: async (req, res) => {
    try {
      const carousels = await Carousel.find();
      res.json({
        status: 200,
        success: true,
        carousels,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createCarousel: async (req, res) => {
    try {
      const { heading, descriptions, image } = req.body;

      if (!image)
        return res.json({
          status: 400,
          success: false,
          msg: "No image upload",
        });
      const newCarousel = new Carousel({ heading, descriptions, image });
      await newCarousel.save();
      res.json({
        status: 200,
        success: true,
        msg: "Created a Carousel ",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //

  //
  deleteCarousel: async (req, res) => {
    try {
      const Carousels = await Carousel.findById({ _id: req.params.id });

      if (!Carousels) {
        return res.json({
          status: 400,
          success: false,
          msg: "Not found Carousel",
        });
      }
      await Carousel.findByIdAndDelete(req.params.id);
      res.json({
        status: 200,
        success: true,
        msg: "Deleted a Carousel",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCarousel: async (req, res) => {
    try {
      const { heading, descriptions, image } = req.body;
      if (!image)
        return res.json({
          status: 400,
          success: false,
          msg: "No image upload",
        });

      await Carousel.findOneAndUpdate(
        { _id: req.params.id },
        { heading, descriptions, image }
      );

      res.json({
        success: true,
        status: 200,
        msg: "Updated a Carousel",
      });
    } catch (err) {
      return res.json({
        status: 500,
        success: false,
        msg: err.message,
      });
    }
  },
};

module.exports = CarouselCtrl;
