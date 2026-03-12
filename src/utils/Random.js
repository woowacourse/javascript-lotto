const pickUniqueNumbersInRange = (startInclusive, endInclusive, count) => {
  const numbers = new Set();
  while (numbers.size < count) {
    const number =
      Math.floor(Math.random() * (endInclusive - startInclusive + 1)) +
      startInclusive;
    numbers.add(number);
  }
  return [...numbers].sort((a, b) => a - b);
};

const Random = { pickUniqueNumbersInRange };

export default Random;
