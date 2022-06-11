const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Products = require("../Model/ProductModel");
const fetch = require("node-fetch");

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
  //*Password Encryption
  async passwordEncryption(password, number) {
    return await bcrypt.hash(password, number);
  },
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
    try {
      await Products.findOneAndUpdate(
        { _id: id },
        {
          countInStock: countInStock - quantity,
        }
      );
    } catch (error) {
      console.error(
        "----------------------Stock--------error------------",
        error
      );
    }
  },
  //*Sold
  async sold(id, quantity, oldSold) {
    try {
      await Products.findOneAndUpdate(
        { _id: id },
        {
          sold: quantity + oldSold,
        }
      );
    } catch (error) {
      console.error(
        "----------------------Sold--------error------------",
        error
      );
    }
  },

  //* RecapCha
  async validateHuman(token) {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
      {
        method: "POST",
      }
    );
    const data = await response.json();
    return data.success;
  },
};
