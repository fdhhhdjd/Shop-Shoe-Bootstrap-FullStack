const { del } = require("../utils/Limited");
const RedisCtrl = {
  deleteCacheRedis: async (req, res) => {
    try {
      const { key } = req.body;
      await del(key);
      res.json({
        msg: "delete cache success",
        status: 200,
      });
    } catch (error) {
      res.json({
        msg: "delete cache Fail",
        status: 200,
      });
    }
  },
};
module.exports = RedisCtrl;
