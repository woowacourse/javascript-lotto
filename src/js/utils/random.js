const getRandomNumber = (max, min) => Math.floor(Math.random() * (max + 1 - min)) + min;

export const isNumbersDuplicated = (numbers) => {
  return numbers ? numbers.length !== new Set(numbers).size : true;
};

const generateRandomNumbers = ({ count, max, min }) => {
  let targetNumbers = null;
  while (isNumbersDuplicated(targetNumbers)) {
    targetNumbers = Array.from({ length: count }).map(() => getRandomNumber(max, min));
  }
  return targetNumbers;
};

export default generateRandomNumbers;
