const Payments = require("../Model/PaymentModel");
const Users = require("../Model/userModel");
const Products = require("../Model/ProductModel");
const paymentCtrl = {
  getPayments: async (req, res) => {
    try {
      const payments = await Payments.find().populate("user_id");
      res.json(payments);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
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
