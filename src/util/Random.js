const Random = {
  generateUniqueNumbersInRange(count, min, max) {
    return Array.from({ length: max - min + 1 }, (_, index) => min + index)
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  },
};

export default Random;
