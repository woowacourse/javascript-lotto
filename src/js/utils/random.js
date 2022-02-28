const getRandomNumber = (max, min) =>
  Math.floor(Math.random() * (max + 1 - min)) + min;

const generateRandomNumbers = ({ count, max, min }) => {
  const randomNumbers = new Set();

  while (randomNumbers.size < count) {
    randomNumbers.add(getRandomNumber(max, min));
  }

  return Array.from(randomNumbers);
};

export default generateRandomNumbers;
