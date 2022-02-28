import { ERROR_MESSAGE, LOTTO, WINNING_AMOUNT } from './constants';

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

export const createLottoList = () => {
  const shuffleRandomList = shuffleArray(createRandomNumberList());

  return Array(LOTTO.LENGTH)
    .fill(0)
    .map((_, index, list) => (list[index] = shuffleRandomList.pop()));
};

export const confirmLottoList = (
  userLottoList,
  lastWeekLottoList,
  lastWeekBounsNumber
) => {
  let count = 0;

  userLottoList.forEach((userLottoNumber) => {
    lastWeekLottoList.forEach((lastWeekLottoNumber) => {
      if (userLottoNumber === lastWeekLottoNumber) {
        count++;
      }
    });
  });

  if (count === 6) {
    return WINNING_AMOUNT.FIRST_WINNER;
  }

  if (count === 5) {
    if (userLottoList.includes(lastWeekBounsNumber)) {
      return WINNING_AMOUNT.SECOND_WINNER;
    }

    return WINNING_AMOUNT.THIRD_WINNER;
  }

  if (count === 4) {
    return WINNING_AMOUNT.FORTH_WINNER;
  }

  if (count === 3) {
    return WINNING_AMOUNT.FIFTH_WINNER;
  }

  return WINNING_AMOUNT.FAILED;
};
