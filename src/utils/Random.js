const Random = {
  pickNumbersInRangeByRule(rule) {
    const { start, end, count } = rule;
    const numbers = new Set();

    while (numbers.size < count) {
      numbers.add(Math.floor(Math.random() * (end - start + 1)) + start);
    }

    return Array.from(numbers);
  },
};

export default Random;
