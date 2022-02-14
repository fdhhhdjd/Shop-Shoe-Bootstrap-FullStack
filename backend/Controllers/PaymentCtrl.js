const Payments = require("../Model/PaymentModel");
const Users = require("../Model/userModel");
const Products = require("../Model/ProductModel");
const paymentCtrl = {
  getPayments: async (req, res) => {
    try {
      const payments = await Payments.find();
      res.json({
        status: 200,
        success: true,
        payments,
      });
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  },
  createPayment: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("name email");
      if (!user)
        return res.status(400).json({
          status: 400,
          success: false,
          msg: "User does not exist.",
        });

      const { cart, paymentID, address } = req.body;

      const { _id, name, email } = user;

      const newPayment = new Payments({
        user_id: _id,
        name,
        email,
        cart,
        paymentID,
        address,
      });

      cart.filter((item) => {
        return sold(item._id, item.quantity, item.sold);
      });

      await newPayment.save();
      res.json({
        status: 200,
        success: true,
        msg: "Payment Success!",
      });
      console.log({ newPayment });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const sold = async (id, quantity, oldSold) => {
  await Products.findOneAndUpdate(
    { _id: id },
    {
      sold: quantity + oldSold,
    }
  );
};

module.exports = paymentCtrl;
