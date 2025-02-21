export const arrayToString = (arrays) => {
  return arrays.map((arr) => `[${arr.join(', ')}]`);
};
