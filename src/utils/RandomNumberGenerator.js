const createNumberArray = (minimum, maximum) => {
  return [...Array(maximum - minimum + 1).keys()].map((num) => num + minimum);
};

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const sliceArray = (array, length) => {
  return array.slice(0, length);
};

const generateRandomNumbers = (minimum, maximum, length) => {
  const numbers = createNumberArray(minimum, maximum);
  const suffledNumbers = shuffleArray(numbers);

  return sliceArray(suffledNumbers, length);
};

export default generateRandomNumbers;
