const getRandomNumber = (max, min) =>
  Math.floor(Math.random() * (max + 1 - min)) + min;

const isAlreadyInsertedNumber = (randomNumbers, number) =>
  randomNumbers.includes(number);

const pushNotYetInsertedNumber = (randomNumbers, number) => {
  if (!isAlreadyInsertedNumber(randomNumbers, number)) {
    randomNumbers.push(number);
  }
};

const generateRandomNumbers = ({ count, max, min }) => {
  const randomNumbers = [];

  while (randomNumbers.length < count) {
    pushNotYetInsertedNumber(randomNumbers, getRandomNumber(max, min));
  }

  return randomNumbers;
};

export default generateRandomNumbers;
