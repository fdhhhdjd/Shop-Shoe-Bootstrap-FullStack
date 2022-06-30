const router = require("express").Router();
const RedisCtrl = require("../Controllers//RedisCache");

router.route("/cache").post(RedisCtrl.deleteCacheRedis);
module.exports = router;
