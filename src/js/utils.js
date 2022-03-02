import { ERROR_MESSAGE, LOTTO } from './constants';

export const isString = (payment) => {
  return typeof payment === 'string';
};

export const isEqualToZero = (payment) => {
  return payment === 0;
};

export const isNegativeInteger = (payment) => {
  return Number.isInteger(payment) && payment < 0;
};

export const hasRemainder = (payment, price) => {
  return payment % price !== 0;
};

export const getPurchasedLottoCount = (payment, price) => {
  if (
    isString(payment) ||
    isNegativeInteger(payment) ||
    isEqualToZero(payment)
  ) {
    throw new Error(ERROR_MESSAGE.MONEY_OUT_OF_RANGE);
  }

  if (hasRemainder(payment, price)) {
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
