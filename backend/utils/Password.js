const bcrypt = require("bcrypt");
const CONSTANT = require("../configs/contants");
const JwtLib = require("jsonwebtoken");

module.exports = {
  encodePassword: (password_text) => {
    return bcrypt.hash(password_text, CONSTANT.SALT_ROUNDS);
  },

  comparePassword: (password_text, password_hash) => {
    return bcrypt.compare(password_text, password_hash);
  },
  //   decodeJWT(token) {
  //     return JwtLib.decode(token, CONFIG.JWT_KEY);
  //   },
};
