/* eslint no-extend-native:0 */
Array.prototype.deepCopy = function () {
  return JSON.parse(JSON.stringify(this));
};
