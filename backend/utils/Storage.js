const jwt = require("jsonwebtoken");

module.exports = {
  /**
   * from String template to URI
   * @author Nguyen Tien Tai
   *
   * @param {string} template
   * @param {object} data
   *
   * @returns {string}
   */
  //*Url navigate Login
  getURIFromTemplate(template, data) {
    const { userID, accessToken } = data;
    return eval("`" + template.replace(/`/g, "\\`") + "`");
  },
  //*Create AccessToken
  createAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.EXPIRES_ACCESS_TOKEN,
    });
  },
  //*Create RefreshToken
  createRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.EXPIRES_REFRESH_TOKEN,
    });
  },
};