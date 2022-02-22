const getRandomNumber = (max, min) =>
  Math.floor(Math.random() * (max + 1 - min)) + min;

const isExistNumber = (numberArray, number) => numberArray.includes(number);

export const generateRandomNumbers = ({ count, max, min }) => {
  const numberArray = [];

  while (numberArray.length < count) {
    const number = getRandomNumber(max, min);

    if (!isExistNumber(numberArray, number)) {
      numberArray.push(number);
    }
  }

  return numberArray;
};
