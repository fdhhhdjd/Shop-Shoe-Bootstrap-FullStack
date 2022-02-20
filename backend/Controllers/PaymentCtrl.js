const Payments = require("../Model/PaymentModel");
const Users = require("../Model/userModel");
const Products = require("../Model/ProductModel");
const paymentCtrl = {
  //Get All Payment
  getPayments: async (req, res) => {
    try {
      const payments = await Payments.find({ deleteAt: false }).populate(
        "user_id"
      );
      res.json(payments);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getPaymentDeletes: async (req, res) => {
    try {
      const payments = await Payments.find({ deleteAt: true }).populate(
        "user_id"
      );
      res.json({
        status: 200,
        success: true,
        msg: "Get All User Delete Payment",
        payments,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //Delete Soft Erase
  DeletePaymentSoftErase: async (req, res) => {
    try {
      await Payments.findByIdAndUpdate(
        { _id: req.params.id },
        {
          deleteAt: true,
        }
      );
      res.status(200).json({
        status: 200,
        success: true,
        msg: "Delete Payment Successfully",
      });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
  UndoPaymentSoftErase: async (req, res) => {
    try {
      await Payments.findByIdAndUpdate(
        { _id: req.params.id },
        {
          deleteAt: false,
        }
      );
      res.status(200).json({
        status: 200,
        success: true,
        msg: "Undo Payment Successfully",
      });
    } catch (error) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //Get Id Payment
  getIdPayment: async (req, res) => {
    const Payment = await Payments.findById(req.params.id);
    try {
      if (!Payment) {
        return res.status(404).json({
          status: 400,
          success: false,
          msg: "Payments not found !!!",
        });
      }
      res.status(200).json({
        status: 200,
        success: true,
        msg: "Get Payments Detail Successfully !",
        Payment,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //Create Payment Paypal
  createPayment: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("name email");
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      const { cart, paymentID, address } = req.body;
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);
      const { _id, name, email } = user;

      const newPayment = new Payments({
        user_id: _id,
        name,
        email,
        cart,
        total,
        paymentID,
        address,
        status: true,
      });

      cart.filter((item) => {
        return sold(item._id, item.quantity, item.sold);
      });
      cart.filter((item) => {
        return stock(item._id, item.quantity, item.countInStock);
      });

      await newPayment.save();
      res.json({ msg: "Payment Succes!" });
      console.log({ newPayment });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //New User Buy 3 Day
  UserNewBuyPayment: async (req, res) => {
    const GetDayNewUserBuy = (d1, d2) => {
      let value1 = d1.getTime();
      let value2 = d2.getTime();
      return Math.ceil((value2 - value1) / (24 * 60 * 60 * 1000));
    };
    let payments = await Payments.find().populate("user_id");
    var today = new Date();
    var result = [];
    for (var i = 0; i < payments.length; i++) {
      var time = GetDayNewUserBuy(payments[i].createdAt, today);
      if (time <= 3) {
        result.push(payments[i]);
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
        total: result.length,
        msg: "Get New User Buy Successfully !!",
        result,
      });
    }
  },
};

const stock = async (id, quantity, countInStock) => {
  await Products.findOneAndUpdate(
    { _id: id },
    {
      countInStock: countInStock - quantity,
    }
  );
  console.log();
};
const sold = async (id, quantity, oldSold) => {
  await Products.findOneAndUpdate(
    { _id: id },
    {
      sold: quantity + oldSold,
    }
  );
  console.log();
};

module.exports = paymentCtrl;
