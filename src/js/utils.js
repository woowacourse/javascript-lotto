import { ERROR_MESSAGE, LOTTO } from './constants';

export const isPositiveInteger = (payment) => {
  if (!Number.isInteger(payment) || payment <= 0) {
    throw new Error(ERROR_MESSAGE.MONEY_OUT_OF_RANGE);
  }

  return payment;
};

export const isDivisibleBy = (payment, price) => {
  if (payment % price !== 0) {
    throw new Error(ERROR_MESSAGE.MONEY_OUT_OF_STANDARD);
  }

  return parseInt(payment / price);
};

export const isOutOfRange = (winningNumberList, bounsNumber) => {
  winningNumberList.push(bounsNumber);
  const lottoAllNumberList = Array.from(
    { length: 45 },
    (_, index) => index + 1
  );

  return !winningNumberList.every((winningNumber) =>
    lottoAllNumberList.includes(winningNumber)
  );
};

export const isUniqueNumbers = (winningNumberList, bounsNumber) => {
  winningNumberList.push(bounsNumber);

  return winningNumberList.length !== new Set(winningNumberList).size;
};

export const createRandomNumberList = (length = LOTTO.MAX_NUMBER) => {
  return Array.from({ length }, (_, index) => index + 1);
};

export const shuffleArray = (array) => {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const getRateOfReturn = (totalWinningAmount, purchasedAmount) => {
  return Number((totalWinningAmount / purchasedAmount).toFixed(2));
};
