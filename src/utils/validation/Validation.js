import ERROR_MESSAGE from "../../constants/ERROR_MESSAGE.js";
import {
  LOTTO_NUMBER_END,
  LOTTO_NUMBER_MAX_LENGTH,
  LOTTO_NUMBER_SPLITER,
  LOTTO_NUMBER_START,
  LOTTO_PURCHASE_UNIT,
  NO,
  YES,
} from "../../constants/constant.js";

const Validation = {
  purchaseAmount(input) {
    const purchaseAmount = Number(input);

    if (!purchaseAmount) throw new Error(ERROR_MESSAGE.INVALID_INPUT_PRICE);
    if (purchaseAmount % LOTTO_PURCHASE_UNIT !== 0) throw new Error(ERROR_MESSAGE.NOT_DIVISIBLE_BY_UNIT);

    return purchaseAmount;
  },
  winningNumbers(input) {
    const winningNumbers = input.split(LOTTO_NUMBER_SPLITER).map((number) => Number(number.trim()));
    if (winningNumbers.length === 1) throw new Error(ERROR_MESSAGE.INVALID_WINNING_NUMBERS_FORMAT);
    if (winningNumbers.length !== LOTTO_NUMBER_MAX_LENGTH) throw new Error(ERROR_MESSAGE.INVALID_WINNING_NUMBERS_COUNT);
    if (winningNumbers.some((number) => isNaN(number))) throw new Error(ERROR_MESSAGE.INVALID_WINNING_NUMBERS_TYPE);
    if (!winningNumbers.every((num) => num >= LOTTO_NUMBER_START && num <= LOTTO_NUMBER_END))
      throw new Error(ERROR_MESSAGE.INVALID_WINNING_NUMBERS_RANGE);
    if (new Set(winningNumbers).size !== winningNumbers.length)
      throw new Error(ERROR_MESSAGE.DUPLICATE_WINNING_NUMBERS);

    return winningNumbers;
  },
  bonusNumber(winningNumbers) {
    return (bonusNumberInput) => {
      const bonusNumber = Number(bonusNumberInput);
      if (!bonusNumber) throw new Error(ERROR_MESSAGE.INVALID_BONUS_NUMBER_TYPE);
      if (bonusNumber < LOTTO_NUMBER_START || bonusNumber > LOTTO_NUMBER_END)
        throw new Error(ERROR_MESSAGE.INVALID_BONUS_NUMBER_RANGE);
      if (winningNumbers.includes(bonusNumber)) throw new Error(ERROR_MESSAGE.DUPLICATE_BONUS_NUMBER);
      return bonusNumber;
    };
  },
  restart(input) {
    if (input !== YES && input !== NO) throw new Error(ERROR_MESSAGE.INVALID_RESTART_FORMAT);

    if (input === YES) {
      return true;
    }
    if (input === NO) {
      return false;
    }
  },
};

export default Validation;
