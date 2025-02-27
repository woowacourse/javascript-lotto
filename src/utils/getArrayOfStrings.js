export const getArrayOfStrings = (arrays) => {
  return arrays.map((arr) => `[${arr.join(', ')}]`);
};
