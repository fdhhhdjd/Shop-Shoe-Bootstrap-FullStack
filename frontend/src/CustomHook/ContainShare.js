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

export default except;
