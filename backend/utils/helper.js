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
  validateEmail(email) {
    //Validates the email address
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  },
  randomString(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdef*&%@+_$ghijklmnopqrstuvwxyz0123456789&%($*#_)@%^";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },
};
