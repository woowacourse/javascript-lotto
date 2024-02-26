const random = Object.freeze({
  shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  },

  pickUniqueNumbersInRange(startInclusive, endInclusive, count) {
    const result = Array.from(
      { length: endInclusive - startInclusive + 1 },
      (_, index) => index + 1
    );

    return random.shuffle(result).slice(0, count);
  },
});

export default random;
