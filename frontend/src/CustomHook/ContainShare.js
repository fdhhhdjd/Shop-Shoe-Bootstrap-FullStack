import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../utils/Config/firebase";
/**
 * Write Code Share
 * @author Nguyen Tien Tai (Frontend)
 *
 * @param {string} template
 * @param {object} data
 *
 * @returns {string}
 */

//*Show Character conditional(có điều kiện)
export const except = (str, number) => {
  if (str?.length > number) {
    str = str.substring(0, number) + " " + "...";
  }
  return str;
};
export const setUpRecapCha = (number) => {
  console.log(number, "-----phone_number----");
  const recaptchaVerifier = new RecaptchaVerifier(
    "recaptcha-container",
    {},
    auth
  );
  recaptchaVerifier.render();
  return signInWithPhoneNumber(auth, number, recaptchaVerifier);
};

export default except;
