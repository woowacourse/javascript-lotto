const getRandomNumber = (max, min) =>
  Math.floor(Math.random() * (max + 1 - min)) + min;

// const isExcludedNumber = (numbers, number) => !numbers.includes(number);

const isExcludedNumber = (numbers, number) => {
  const numbersSet = new Set(numbers);
  return !numbersSet.has(number);
};

const generateRandomNumbers = ({ count, max, min }) => {
  const randomNumbers = [];

  while (randomNumbers.length < count) {
    const randomNumber = getRandomNumber(max, min);
    if (isExcludedNumber(randomNumbers, randomNumber)) {
      randomNumbers.push(randomNumber);
    }
  }

  return randomNumbers;
};

export default generateRandomNumbers;
