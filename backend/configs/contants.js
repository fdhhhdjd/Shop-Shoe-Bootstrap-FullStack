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

  //* Connect Take Data
  STORAGE_GRAPH_FACEBOOK:
    "https://graph.facebook.com/v13.0/${userID}/?fields=picture.width(300).height(300),id,name,email&access_token=${accessToken}",
  //*Flag Delete
  DELETED_ENABLE: true,
  DELETED_DISABLE: false,

  //*Time RefreshToken exist
  _1_MINUTES: 60 * 1000,
  _5_MINUTES: 5 * 60 * 1000,
  _45_MINUTES: 45 * 60 * 1000,
  _1_DAY: 24 * 60 * 60 * 1000,
  _7_DAY: 7 * 24 * 60 * 60 * 1000,
  _1_DAY_S: 24 * 60 * 60,
  _1_HOURS_S: 60 * 60,
  _1_YEAR: 365 * 24 * 60 * 60 * 1000,

  //*Password
  PASSWORD_GOOGLE: null,
  //*Character
  CHARACTER_NUMBER: 10,

  //* Hash password
  SALT_ROUNDS: 10,
};
