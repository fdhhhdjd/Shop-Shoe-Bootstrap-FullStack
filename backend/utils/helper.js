module.exports = {
  validateEmail(email) {
    //Validates the email address
    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(email);
  },
};
