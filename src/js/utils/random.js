const getRandomNumber = (max, min) => Math.floor(Math.random() * (max + 1 - min)) + min;

const isExcludedNumber = (numbers, number) => {
  const numbersSet = new Set(numbers);
  return !numbersSet.has(number);
};

const pushExcludedNumber = (resultArray, randomNumber) => {
  if (isExcludedNumber(resultArray, randomNumber)) {
    resultArray.push(randomNumber);
  }
};

const generateRandomNumbers = ({ count, max, min }) => {
  const resultArray = [];

  while (resultArray.length < count) {
    const randomNumber = getRandomNumber(max, min);
    pushExcludedNumber(resultArray, randomNumber);
  }

  return resultArray;
};

export default generateRandomNumbers;
