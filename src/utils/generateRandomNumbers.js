const generateRandomNumbers = (min, max, count) => {
  const numbers = new Set();

  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }

  return [...numbers].sort((a, b) => a - b);
};

export default generateRandomNumbers;
