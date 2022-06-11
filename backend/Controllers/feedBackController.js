const Feedbacks = require("../Model/feedBackModel.js");
const sendEmail = require("./SendEmail.js");
const path = require("path");

const feedbackCtrl = {
  //Xem tất cả phản hồi gửi tới
  async getAllFeedback(req, res) {
    try {
      const list_feedback = await Feedbacks.find({});
      return res.status(200).json({
        status: 200,
        success: true,
        msg: "Get all feedbacks successfully",
        data: list_feedback,
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        success: false,
        msg: "Failed to get all feedbacks",
      });
    }
  },

  //Admin trả lời những phản hồi khách hàng gửi tới
  async responseFeedback(req, res) {
    try {
      const id = req.params.id;
      const { response_content } = req.body;
      const feedback = await Feedbacks.findById({ _id: id });
      if (!feedback) {
        return res.status(400).json({
          status: 400,
          success: false,
          msg: "This feedback does not exist",
        });
      }

      await sendEmail({
        from: process.env.SMPT_MAIL,
        to: feedback.email,
        subject: feedback.subject,
        template: "response_feedback",
        attachments: [
          {
            filename: "netflix.jpg",
            path: path.resolve("./views", "images", "netflix.jpg"),
            cid: "netflix_logo",
          },
        ],
        context: {
          fullname: feedback.fullname,
          feedback_content: feedback.content,
          response_content,
        },
      });

      return res.status(200).json({
        status: 200,
        success: true,
        msg: "Sent email response feedback successfully",
      });
    } catch (err) {
      return res.status(400).json({
        status: 400,
        success: false,
        msg: "Failed to send response feedback",
      });
    }
  },

  //gửi email phản hồi cho web
  async sendFeedback(req, res) {
    try {
      const { fullname, email, subject, content, read_at } = req.body;
      let time_log_gmt7_string = new Date().toISOString();

      if (!fullname || !email || !subject || !content) {
        return res.status(400).json({
          status: 400,
          success: false,
          msg: "Please fill in full infomation",
        });
      }
      const newFeedback = new Feedbacks({
        fullname,
        email,
        subject,
        content,
        send_at: time_log_gmt7_string,
        read_at,
      });
      //save in mongodb
      await newFeedback.save().then(async (item) => {
        if (item) {
          await sendEmail({
            from: process.env.SMPT_MAIL,
            to: email,
            subject,
            template: "feedback",
            attachments: [
              {
                filename: "netflix.jpg",
                path: path.resolve("./views", "images", "netflix.jpg"),
                cid: "netflix_logo",
              },
            ],
            context: {
              fullname,
              content,
            },
          });
        }
      });
      return res.status(200).json({
        status: 200,
        success: true,
        msg: "Sent feedback successfully",
      });
    } catch (err) {
      return res.json({
        status: 400,
        success: false,
        msg: err.message,
      });
    }
  },

  // Reading email
  async ReadingEmail(req, res) {
    try {
      let time_log_gmt7_string = new Date().toISOString();

      await Feedbacks.findOneAndUpdate(
        { _id: req.params.id },
        { read_at: time_log_gmt7_string, checked: true }
      );

      res.json({
        success: true,
        status: 200,
        msg: "Reading Email successfully",
      });
    } catch (err) {
      return res.json({
        status: 500,
        success: false,
        msg: err.message,
      });
    }
  },

  //Search Feedback name email and date
  async SearchDateAndName(req, res) {
    let { search_text, DateFrom, DateTo, limit, page, checked } = req.body;
    // search query
    let search = {};
    let time_log_gmt7_string = new Date().toISOString();

    if (!["", " ", "null", null, "undefined"].includes(search_text)) {
      search.$text = { $search: search_text };
    }
    if (DateFrom && DateTo === "") {
      return Feedbacks.find({
        checked: false,
        send_at: {
          $gte: DateFrom,
          $lt: time_log_gmt7_string,
        },
      })
        .sort([["send_at", -1]])
        .limit(limit)
        .skip(limit * (page - 1))
        .then((result) => {
          //count total
          Feedbacks.countDocuments(search).then((total) => {
            return res.status(200).json({
              status: 200,
              success: true,
              msg: "Search date",
              data: result,
            });
          });
        })
        .catch((err) => {
          return res.status(200).json({});
        });
    }

    if (DateFrom && DateTo) {
      return Feedbacks.find({
        send_at: {
          $gte: DateFrom,
          $lt: DateTo,
        },
      })
        .sort([["send_at", -1]])
        .limit(limit)
        .skip(limit * (page - 1))
        .then((result) => {
          //count total
          Feedbacks.countDocuments(search).then((total) => {
            return res.status(200).json({
              status: 200,
              success: true,
              msg: "Search date",
              data: result,
            });
          });
        })
        .catch((err) => {
          return res.status(200).json({});
        });
    }

    Feedbacks.find(search)
      .sort([["send_at", -1]])
      .limit(limit)
      .skip(limit * (page - 1))
      .then((result) => {
        //count total
        Feedbacks.countDocuments(search).then((total) => {
          return res.status(200).json({
            total: total,
            notices: result,
          });
        });
      })
      .catch((err) => {
        return res.status(400).json({});
      });
  },

  //Filter Not seen and seen Email
  async ReadingEmail(req, res) {
    try {
      let time_log_gmt7_string = new Date().toISOString();

      await Feedbacks.findOneAndUpdate(
        { _id: req.params.id },
        { read_at: time_log_gmt7_string, checked: true }
      );

      res.json({
        success: true,
        status: 200,
        msg: "Reading Email successfully",
      });
    } catch (err) {
      return res.json({
        status: 500,
        success: false,
        msg: err.message,
      });
    }
  },

  //Search Feedback name email and date
  async FilterEmail(req, res) {
    let { checked } = req.body;
    // search query
    if (checked === "0") {
      const list_feedback = await Feedbacks.find({});
      return res.status(200).json({
        status: 200,
        success: true,
        msg: "Get all feedbacks successfully",
        data: list_feedback,
      });
    } else if (checked === "1") {
      const list_feedback = await Feedbacks.find({ checked: true });
      return res.status(200).json({
        status: 200,
        success: true,
        msg: "Get all feedbacks successfully",
        data: list_feedback,
      });
    } else if (checked === "2") {
      const list_feedback = await Feedbacks.find({ checked: false });
      return res.status(200).json({
        status: 200,
        success: true,
        msg: "Get all feedbacks successfully",
        data: list_feedback,
      });
    }
  },
};

module.exports = feedbackCtrl;
