const randomNumberGenerator = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const pickUniqueNumbersInRange = (min, max, count) => {
  const uniqueNumbers = new Set();
  while (uniqueNumbers.size < count) {
    uniqueNumbers.add(randomNumberGenerator(min, max));
  }
  return [...uniqueNumbers];
};

export default pickUniqueNumbersInRange;
