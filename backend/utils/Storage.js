const jwt = require("jsonwebtoken");
const Products = require("../Model/ProductModel");
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
  //*Stock
  async stock(id, quantity, countInStock) {
    await Products.findOneAndUpdate(
      { _id: id },
      {
        countInStock: countInStock - quantity,
      }
    );
  },
  //*Sold
  async sold(id, quantity, oldSold) {
    await Products.findOneAndUpdate(
      { _id: id },
      {
        sold: quantity + oldSold,
      }
    );
  },
};
