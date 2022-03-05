const Voucher = require("../Model/VoucherModel");
const Users = require("../Model/userModel");
const categoryCtrl = {
  getAllVoucher: async (req, res) => {
    try {
      const vouchers = await Voucher.find();
      res.json({
        status: 200,
        success: true,
        vouchers,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createVoucher: async (req, res) => {
    try {
      const { title, value } = req.body;
      const titleVoucher = await Voucher.findOne({ title });
      if (titleVoucher)
        return res.json({
          status: 400,
          success: false,
          msg: "This Voucher already exists.",
        });
      const newVoucher = new Voucher({ title, value });
      await newVoucher.save();
      res.json({
        status: 200,
        success: true,
        msg: "Create Voucher successfully",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  DeleteVoucher: async (req, res) => {
    try {
      const voucher = await Voucher.findById({ _id: req.params.id });
      if (!voucher) {
        return res.json({
          status: 400,
          success: false,
          msg: "Not found Voucher",
        });
      }

      await Voucher.findByIdAndDelete(req.params.id);
      res.json({
        status: 200,
        success: true,
        msg: "Deleted a Voucher",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateVoucher: async (req, res) => {
    try {
      const { title, value } = req.body;
      const titleVoucher = await Voucher.findOne({ title });
      if (titleVoucher)
        return res.json({
          status: 400,
          success: false,
          msg: "This Voucher already exists.",
        });
      await Voucher.findOneAndUpdate({ _id: req.params.id }, { title, value });
      res.json({
        success: true,
        status: 200,
        msg: "Updated a Voucher",
      });
    } catch (err) {
      return res.json({
        status: 500,
        success: false,
        msg: err.message,
      });
    }
  },
  TotalCart: async (req, res) => {
    try {
      const { voucher_code } = req.body;
      const data = await Users.findById(req.user.id).select("cart");
      //neu ko nhap voucher thi discount_value = 0
      if (!voucher_code) {
        const totalCart = data.cart.reduce((prev, item) => {
          return prev + item.price * item.quantity;
        }, 0);
        res.json({ totalCart: totalCart, discount_value: 0 });
      } else if (voucher_code) {
        const voucher = await Voucher.findOne({ title: voucher_code });
        //nhap voucher nhung bi khong hop le
        if (!voucher) {
          const totalCart = data.cart.reduce((prev, item) => {
            return prev + item.price * item.quantity;
          }, 0);
          res.json({
            status: 400,
            success: false,
            msg: "Not Found Voucher",
            totalCart,
          });
        }
        const totalCart = data.cart.reduce((prev, item) => {
          return prev + item.price * item.quantity;
        }, 0);

        const discount_value = ((totalCart / 100) * voucher.value).toFixed(1);

        const total_cart = totalCart - discount_value;

        await Users.findByIdAndUpdate(
          { _id: req.user.id },
          { total_cart: total_cart }
        );

        res.json({
          status: 200,
          success: true,
          voucher: voucher,
          cost: totalCart,
          totalCart: total_cart,
          msg: "Code Voucher Exactly",
        });
      }
    } catch (error) {
      return res.json({
        status: 500,
        success: false,
        msg: error.message,
      });
    }
  },
};

module.exports = categoryCtrl;
