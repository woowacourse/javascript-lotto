/**
 * @param {Array} arrays - An array of arrays
 * @returns {Array} An array of strings
 * ex) getArrayOfStringsFromArrayOfArrays([['a', 'b'], ['c', 'd']]) => ['a, b', 'c, d']
 */

export const getArrayOfStringsFromArrayOfArrays = (arrays) => {
  return arrays.map((arr) => `${arr.join(', ')}`);
};
