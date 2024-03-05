const Random = {
  pickUniqueNumbersInRange({ from = 0, to = 0, size = 0 }) {
    const numbers = new Set();
    while (numbers.size < size) {
      const randomNum = Math.floor(Math.random() * (to - from + 1)) + from;
      numbers.add(randomNum);
    }
    return Array.from(numbers);
  },
};
export default Random;
