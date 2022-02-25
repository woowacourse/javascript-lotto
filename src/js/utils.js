import { ERROR_MESSAGE, LOTTO } from './constants';

const isPositiveInteger = (payment) => {
  if (!Number.isInteger(payment) || payment <= 0) {
    throw new Error(ERROR_MESSAGE.MONEY_OUT_OF_RANGE);
  }

  return payment;
};

const isDivisibleBy = (payment, price) => {
  if (payment % price !== 0) {
    throw new Error(ERROR_MESSAGE.MONEY_OUT_OF_STANDARD);
  }

  return parseInt(payment / price);
};

const createRandomNumber = (minNumber, maxNumber) => {
  return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);
};

const createRandomNumberList = () => {
  const randomNumbers = new Set();

  while (randomNumbers.size < LOTTO.LENGTH) {
    const randomNumber = createRandomNumber(LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER);
    randomNumbers.add(randomNumber);
  }

  return [...randomNumbers];
};

export {
  isPositiveInteger,
  isDivisibleBy,
  createRandomNumber,
  createRandomNumberList,
};
