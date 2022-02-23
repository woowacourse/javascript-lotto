const getRandomNumber = (max, min) =>
  Math.floor(Math.random() * (max + 1 - min)) + min;

const isExistNumber = (randomNumbers, number) => randomNumbers.includes(number);

const pushNonExistNumber = (randomNumbers, number) => {
  if (!isExistNumber(randomNumbers, number)) {
    randomNumbers.push(number);
  }
};

const generateRandomNumbers = ({ count, max, min }) => {
  const randomNumbers = [];

  while (randomNumbers.length < count) {
    pushNonExistNumber(randomNumbers, getRandomNumber(max, min));
  }

  return randomNumbers;
};

export default generateRandomNumbers;
