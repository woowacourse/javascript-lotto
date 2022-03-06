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

export const isOutOfRange = (winningNumberList, bonusNumber) => {
  const winningNumbers = [...winningNumberList, bonusNumber];
  const lottoAllNumberList = Array.from(
    { length: LOTTO.MAX_NUMBER },
    (_, index) => index + 1
  );

  return !winningNumbers.every((winningNumber) =>
    lottoAllNumberList.includes(winningNumber)
  );
};

export const isDuplicateNumbers = (winningNumberList, bonusNumber) => {
  const winningNumbers = [...winningNumberList, bonusNumber];

  return winningNumbers.length !== new Set(winningNumbers).size;
};

export const getValidWinningNumberAndBonusNumber = (
  winningNumberList,
  bonusNumber
) => {
  if (
    isOutOfRange(winningNumberList, bonusNumber) ||
    isDuplicateNumbers(winningNumberList, bonusNumber)
  ) {
    throw new Error(ERROR_MESSAGE.NOT_DUPLICATED_NUMBERS);
  }

  return { winningNumberList, bonusNumber };
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

export const countingDuplicates = (userLottoList, lastWeekLottoList) => {
  let count = 0;

  userLottoList.forEach((userLottoNumber) => {
    lastWeekLottoList.forEach((lastWeekLottoNumber) => {
      if (userLottoNumber === lastWeekLottoNumber) {
        count++;
      }
    });
  });

  return count;
};

export const getRateOfReturn = (totalWinningAmount, purchasedAmount) => {
  return Number(
    (((totalWinningAmount - purchasedAmount) / purchasedAmount) * 100).toFixed(
      2
    )
  );
};

export const changeToUpperSnakeCase = (string) => {
  return string
    .split('')
    .map((character) => {
      if (character === character.toUpperCase()) {
        return `_${character.toUpperCase()}`;
      }
      return character.toUpperCase();
    })
    .join('');
};
