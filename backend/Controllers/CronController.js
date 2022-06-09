const Users = require("../Model/userModel");
const UserVerifications = require("../Model/userVerificationModel");
const CONSTANTS = require("../configs/contants");
module.exports = {
  /**
   * @author Tiến Tài
   * Delete Uncheck
   */
  async GetAllUserUnCheck() {
    const data = await UserVerifications.find({
      expiresAt: { $lt: Date.now() },
    }).select("userId");
    const users = await Users.find({
      verified: CONSTANTS.DELETED_DISABLE,
    }).select("_id");
    console.log(data);
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
