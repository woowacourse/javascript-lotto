import ERROR_MESSAGE from "../constant/error.js";
import PRICE from "../constant/price.js";
import RESTART_ANSWER from "../constant/answer.js";
import { LOTTO } from "../constant/lotto.js";

export const validateRestart = (answer) => {
  if (
    answer.toLowerCase() !== RESTART_ANSWER.YES &&
    answer.toLowerCase() !== RESTART_ANSWER.NO
  ) {
    throw new Error(ERROR_MESSAGE.YES_OR_NO);
  }
};

export const validatePurchaseAmount = (price) => {
  if (isNaN(price)) throw new Error(ERROR_MESSAGE.NOT_A_NUMBER);
  if (price < PRICE.UNIT) throw new Error(ERROR_MESSAGE.UNDER_MIN_PRICE);
  if (price > PRICE.MAX) throw new Error(ERROR_MESSAGE.EXCEED_MAX_PRICE);
  if (price % PRICE.UNIT !== 0) throw new Error(ERROR_MESSAGE.NOT_DIVIDED_1000);
};

export const validateWinningNumbers = (numbers) => {
  const numbersArray = numbers.split(LOTTO.SPLITTER).map(Number);
  if (numbersArray.length < LOTTO.LENGTH)
    throw new Error(ERROR_MESSAGE.LOTTO_LENGTH);
  if (numbersArray.some((num) => isNaN(num)))
    throw new Error(ERROR_MESSAGE.NOT_A_NUMBER);
  if (numbersArray.length !== new Set(numbersArray).size)
    throw new Error(ERROR_MESSAGE.DUPLICATE_WINNING_NUMBER);
  if (
    numbersArray.some(
      (num) => num < LOTTO.MIN_RANDOM_VALUE || num > LOTTO.MAX_RANDOM_VALUE,
    )
  )
    throw new Error(ERROR_MESSAGE.NUMBER_OUT_OF_RANGE);
};

export const validateBonusNumber = (numberInput, numbers) => {
  const number = Number(numberInput);
  if (isNaN(number)) throw new Error(ERROR_MESSAGE.NOT_A_NUMBER);
  if (number < LOTTO.MIN_RANDOM_VALUE || number > LOTTO.MAX_RANDOM_VALUE)
    throw new Error(ERROR_MESSAGE.NUMBER_OUT_OF_RANGE);
  if (numbers.includes(number))
    throw new Error(ERROR_MESSAGE.DUPLICATE_BONUS_NUMBER);
};
