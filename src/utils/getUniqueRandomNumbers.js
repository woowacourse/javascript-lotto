const getUniqueRandomNumbers = (min, max, count) => {
  const range = Array.from(
    { length: max - min + 1 },
    (_, index) => min + index
  );
  const shuffled = range.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).sort((a, b) => a - b);
};

export default getUniqueRandomNumbers;
