import readLineAsync from "./readLineAsync.js";
import {
  validateIsNumeric,
  validateLottoNumberRange,
  validateMaximumValue,
  validateMinimumValue,
  validatePurchaseUnit,
  validateWinningNumberDuplicate,
} from "./validate.js";

export const inputPrice = async () => {
  try {
    const price = Number(await readLineAsync("구입금액을 입력해 주세요."));
    validateIsNumeric(price);
    validateMinimumValue(price);
    validatePurchaseUnit(price);
    validateMaximumValue(price);
    return price;
  } catch (error) {
    console.log(error.message);
    return await inputPrice();
  }
};

export const inputWinningNumbers = async () => {
  try {
    const winninNumbers = (await readLineAsync("\n당첨 번호를 입력해 주세요."))
      .split(",")
      .map(Number);
    winninNumbers.forEach((number) => {
      validateIsNumeric(number);
      validateLottoNumberRange(number);
    });
    validateWinningNumberDuplicate(winninNumbers);
    return winninNumbers;
  } catch (error) {
    console.log(error.message);
    return await inputWinningNumbers();
  }
};
