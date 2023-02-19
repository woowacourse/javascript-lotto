const generateRandomNumbersIn = (min, max) => (count) => () => {
  if (count > max - min + 1) {
    throw new Error('[ERROR] ');
  }

  return new Array(max - min + 1)
    .fill()
    .map((_, index) => min + index)
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
    .sort((a, b) => a - b);
};

export default generateRandomNumbersIn;
