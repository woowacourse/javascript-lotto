function generateRandomNumbersInRange(minimum, maximum, count) {
  const numbers = [...Array(maximum - minimum + 1).keys()].map(
    (num) => num + minimum,
  );

  numbers.sort(() => Math.random() - 0.5);

  return numbers.slice(0, count);
}

export default generateRandomNumbersInRange;
