export const pickNumbersInRange = ({ from = 0, to = 0, count = 0 }) => {
  const numbers = [];
  while (numbers.length < count) {
    const random = Math.floor(Math.random() * (to - from + 1)) + from;
    !numbers.includes(random) && numbers.push(random);
  }
  return numbers;
};
