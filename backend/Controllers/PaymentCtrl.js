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
      await Payments.findOneAndUpdate(
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
      res.json({ msg: "Payment Success!" });
      console.log({ newPayment });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //Update order status
  async updateOrderStatus(req, res) {
    try {
      const id = req.params.id;
      const { order_status } = req.body;

      if (order_status !== "On Delivery" && order_status !== "Delivered") {
        return res.json({
          status: 400,
          success: false,
          msg: "Please choose order status",
        });
      }
      await Payments.findByIdAndUpdate(
        { _id: id },
        { order_status, updatedAt: Date.now }
      );
      return res.status(200).json({
        status: 200,
        success: true,
        msg: "Update order status successfully",
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        success: false,
        msg: "Failed to update order status",
      });
    }
  },

  //New User Buy 3 Day
  UserNewBuyPayment: async (req, res) => {
    const GetDayNewUserBuy = (d1, d2) => {
      let value1 = d1.getTime();
      let value2 = d2.getTime();
      return Math.ceil((value2 - value1) / (24 * 60 * 60 * 1000));
    };
    let payments = await Payments.find({ deleteAt: false }).populate("user_id");
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

  //Get sum of income
  async getSumOfIncome(req, res) {
    try {
      const data = await Payments.aggregate([
        {
          $group: {
            _id: "sum_of_income",
            total: { $sum: "$total" },
          },
        },
      ]);

      return res.status(200).json({
        status: 200,
        success: true,
        msg: "Get sum of income successfully",
        data,
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        success: false,
        msg: "Get sum of income fail",
      });
    }
  },

  //Get monthly the income customer have received
  async getMonthlyIncomeCustomerReceived(req, res) {
    const monthly = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const year_now = new Date().getFullYear();
    console.log(year_now);

    try {
      let data = await Payments.aggregate([
        {
          $project: {
            month: { $month: "$updatedAt" },
            year: { $year: "$updatedAt" },
            order_status: 1,
            total: 1,
          },
        },
        {
          $match: {
            month: { $in: monthly },
            year: year_now,
            order_status: "Delivered",
          },
        },
        {
          $group: {
            _id: {
              month: "$month",
            },
            total_income: { $sum: "$total" },
          },
        },
        { $sort: { _id: 1 } },
      ]);
      res.status(200).json({
        status: 200,
        success: true,
        msg: "Get monthly income successfully",
        data,
      });
    } catch (err) {
      res.status(400).json({
        status: 400,
        success: false,
        msg: "Failed to get monthly income",
      });
    }
  },

  //Get the income customer received this month and compare to last month
  async getIncomeCustomerReceivedThisAndLastMonth(req, res) {
    const thisMonth = new Date().getMonth() + 1;
    const lastMonth = new Date().getMonth();

    try {
      let data = await Payments.aggregate([
        {
          $project: {
            month: { $month: "$updatedAt" },
            order_status: 1,
            total: 1,
          },
        },
        {
          $match: {
            month: { $in: [lastMonth, thisMonth] },
            order_status: "Delivered",
          },
        },
        {
          $group: {
            _id: {
              month: "$month",
              order_status: "$order_status",
            },
            total_income: { $sum: "$total" },
          },
        },
        { $sort: { _id: -1 } },
      ]);

      if (data.length === 0) {
        return res.status(400).json({
          status: 400,
          success: false,
          msg: "Not data to show",
        });
      } else if (data.length === 1) {
        if (data[0]._id.month === thisMonth) {
          data = [
            {
              _id: {
                month: "This month",
                order_status: "Delivered",
              },
              total_income: data[0].total_income,
            },
            {
              _id: {
                month: "Last month",
                order_status: "Delivered",
              },
              total_income: 0,
            },
            {
              compared: "Increased",
              value: data[0].total_income * 100,
            },
          ];

          return res.status(200).json({
            status: 200,
            success: true,
            msg: "Get income of orders customer have received this and last month successfully",
            data,
          });
        } else if (data[0]._id.month === lastMonth) {
          data = [
            {
              _id: {
                month: "This month",
                order_status: "Delivered",
              },
              total_income: 0,
            },
            {
              _id: {
                month: "Last month",
                order_status: "Delivered",
              },
              total_income: data[0].total_income,
            },
            {
              compared: "Decreased",
              value: -100,
            },
          ];
          return res.status(200).json({
            status: 200,
            success: true,
            msg: "Get income of orders customer have received this and last month successfully",
            data,
          });
        }
      } else if (data.length === 2) {
        (data[0]._id.month = "This month"), (data[1]._id.month = "Last month");

        const value = (
          ((data[0].total_income - data[1].total_income) /
            data[1].total_income) *
          100
        ).toFixed(1);

        const compared = value >= 0 ? "Increased" : "Decreased";

        const compareToLastMonth = {
          compared,
          value,
        };

        data.push(compareToLastMonth);

        return res.status(200).json({
          status: 200,
          success: true,
          msg: "Get income of orders customer have received this and last month successfully",
          data,
        });
      }
    } catch (error) {
      res.status(400).json({
        status: 400,
        success: false,
        msg: "Get income of orders customer have received this and last month fail",
        error: error.message,
      });
    }
  },

  //Get the income customer not received this month and compare to last month
  async getIncomeCustomerNotReceivedThisAndLastMonth(req, res) {
    const thisMonth = new Date().getMonth() + 1;
    const lastMonth = new Date().getMonth();

    try {
      let data = await Payments.aggregate([
        {
          $project: {
            month: { $month: "$updatedAt" },
            order_status: 1,
            total: 1,
          },
        },
        {
          $match: {
            month: { $in: [lastMonth, thisMonth] },
            order_status: { $in: ["Ordered", "On Delivery"] },
          },
        },
        {
          $group: {
            _id: {
              month: "$month",
              order_status: "$order_status",
            },
            total_income: { $sum: "$total" },
          },
        },
        { $sort: { _id: -1 } },
      ]);

      if (data.length === 0) {
        return res.status(400).json({
          status: 400,
          success: false,
          msg: "Not data to show",
        });
      } else if (data.length === 1) {
        if (data[0]._id.month === thisMonth) {
          data = [
            {
              _id: {
                month: "This month",
                order_status: "Cusomer Not Received",
              },
              total_income: data[0].total_income,
            },
            {
              _id: {
                month: "Last month",
                order_status: "Cusomer Not Received",
              },
              total_income: 0,
            },
            {
              compared: "Increased",
              value: data[0].total_income * 100,
            },
          ];

          return res.status(200).json({
            status: 200,
            success: true,
            msg: "Get income of orders customer have not received this and last month successfully",
            data,
          });
        } else if (data[0]._id.month === lastMonth) {
          data = [
            {
              _id: {
                month: "This month",
                order_status: "Cusomer Not Received",
              },
              total_income: 0,
            },
            {
              _id: {
                month: "Last month",
                order_status: "Cusomer Not Received",
              },
              total_income: data[0].total_income,
            },
            {
              compared: "Decreased",
              value: -100,
            },
          ];
          return res.status(200).json({
            status: 200,
            success: true,
            msg: "Get income of orders customer have not received this and last month successfully",
            data,
          });
        }
      } else if (data.length === 2) {
        (data[0]._id.month = "This month"), (data[1]._id.month = "Last month");
        data[0]._id.order_status = "Cusomer Not Received";
        data[1]._id.order_status = "Cusomer Not Received";

        const value = (
          ((data[0].total_income - data[1].total_income) /
            data[1].total_income) *
          100
        ).toFixed(1);

        const compared = value >= 0 ? "Increased" : "Decreased";

        const compareToLastMonth = {
          compared,
          value,
        };

        data.push(compareToLastMonth);

        return res.status(200).json({
          status: 200,
          success: true,
          msg: "Get income of orders customer have not received this and last month successfully",
          data,
        });
      }
    } catch (error) {
      res.status(400).json({
        status: 400,
        success: false,
        msg: "Get income of orders customer have not received this and last month fail",
        error: error.message,
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
