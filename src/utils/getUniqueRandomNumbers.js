const getUniqueRandomNumbers = (min, max, count) => {
  const numbers = Array.from({ length: max - min + 1 }, (_, i) => i + min);
  numbers.sort(() => Math.random() - 0.5);
  return numbers.slice(0, count);
};

export default getUniqueRandomNumbers;
