const Random = {
  pickNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  },

  shuffle(array) {
    const result = [...array];

    result.forEach((value, index) => {
      const randomPosition = Random.pickNumberInRange(index, result.length);
      result[index] = result[randomPosition];
      result[randomPosition] = value;
    });

    return result;
  },

  generateUniqueNumbersInRange(count, min, max) {
    return Random.shuffle(Array.from({ length: max - min + 1 }, (_, index) => min + index))
      .slice(0, count);
  },
};

export default Random;
