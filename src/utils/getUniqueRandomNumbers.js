const getUniqueRandomNumbers = (min, max, count) => {
  const randomNumbers = new Set();
  while (randomNumbers.size < count) {
    randomNumbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return Array.from(randomNumbers);
};

export default getUniqueRandomNumbers;
