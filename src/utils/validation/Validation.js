import ERROR_MESSAGE from "../../constants/ERROR_MESSAGE.js";

const Validation = {
  purchaseAmount(input) {
    const purchaseAmount = Number(input);

    if (!purchaseAmount) throw new Error(ERROR_MESSAGE.INVALID_INPUT_PRICE);
    if (purchaseAmount % 1000 !== 0) throw new Error(ERROR_MESSAGE.NOT_DIVISIBLE_BY_UNIT);

    return purchaseAmount;
  },
  winningNumbers(input) {
    const winningNumbers = input.split(",").map((number) => Number(number.trim()));
    if (winningNumbers.length === 1) throw new Error(ERROR_MESSAGE.INVALID_WINNING_NUMBERS_FORMAT);
    if (winningNumbers.length !== 6) throw new Error(ERROR_MESSAGE.INVALID_WINNING_NUMBERS_COUNT);
    if (winningNumbers.some((number) => isNaN(number))) throw new Error(ERROR_MESSAGE.INVALID_WINNING_NUMBERS_TYPE);
    if (!winningNumbers.every((num) => num >= 1 && num <= 45))
      throw new Error(ERROR_MESSAGE.INVALID_WINNING_NUMBERS_RANGE);
    if (new Set(winningNumbers).size !== winningNumbers.length)
      throw new Error(ERROR_MESSAGE.DUPLICATE_WINNING_NUMBERS);

    return winningNumbers;
  },
  bonusNumber(winningNumbers) {
    return (bonusNumberInput) => {
      const bonusNumber = Number(bonusNumberInput);
      if (!bonusNumber) throw new Error(ERROR_MESSAGE.INVALID_BONUS_NUMBER_TYPE);
      if (bonusNumber < 1 || bonusNumber > 45) throw new Error(ERROR_MESSAGE.INVALID_BONUS_NUMBER_RANGE);
      if (winningNumbers.includes(bonusNumber)) throw new Error(ERROR_MESSAGE.DUPLICATE_BONUS_NUMBER);
      return bonusNumber;
    };
  },
};

export default Validation;
