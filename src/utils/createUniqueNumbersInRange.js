const createUniqueNumbersInRange = ({ start, end, count }) => {
  const numbers = new Set();
  while (numbers.size < count) {
    const randomNum = Math.floor(Math.random() * end) + start;
    numbers.add(randomNum);
  }

  return Array.from(numbers);
};

export default createUniqueNumbersInRange;
