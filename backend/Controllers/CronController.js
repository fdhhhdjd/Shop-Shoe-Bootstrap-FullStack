const Users = require("../Model/userModel");
const UserVerifications = require("../Model/userVerificationModel");
const CONSTANTS = require("../configs/contants");
const { del } = require("../utils/Limited");
module.exports = {
  /**
   * @author Tiến Tài
   * Delete Uncheck
   */
  async GetAllUserUnCheck() {
    const data = await UserVerifications.find({
      expiresAt: { $lt: Date.now() },
    }).select("userId");
    if (data.length > 0) {
      await del("uncheck");
    }
    const users = await Users.find({
      verified: CONSTANTS.DELETED_DISABLE,
    }).select("_id");
    for (var i = 0; i < data.length; i++) {
      for (var j = 0; j < users.length; j++) {
        if (data[i].userId == users[j].id) {
          await Users.deleteOne({ _id: users[j].id });
          await UserVerifications.deleteOne({ userId: data[i].userId });
        }
      }
    }
  },
};
