const getRandomNumber = (max, min) => Math.floor(Math.random() * (max + 1 - min)) + min;

const isExcludedNumber = (numbers, number) => {
  const numbersSet = new Set(numbers);
  return !numbersSet.has(number);
};

const generateRandomNumbers = ({ count, max, min }) => {
  const resultArray = [];

  while (resultArray.length < count) {
    const randomNumber = getRandomNumber(max, min);
    if (isExcludedNumber(resultArray, randomNumber)) {
      resultArray.push(randomNumber);
    }
  }

  return resultArray;
};

export default generateRandomNumbers;
