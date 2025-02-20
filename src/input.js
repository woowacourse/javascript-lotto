import readLineAsync from "./readLineAsync.js";
import {
  validateBonusNumberUnique,
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

export const inputBonusNumber = async (winningNumber) => {
  try {
    const bonusNumber = Number(
      await readLineAsync("\n보너스 번호를 입력해 주세요.")
    );
    validateIsNumeric(bonusNumber);
    validateLottoNumberRange(bonusNumber);
    validateBonusNumberUnique(winningNumber, bonusNumber);
    return bonusNumber;
  } catch (error) {
    console.log(error.message);
    return await inputBonusNumber(winningNumber);
  }
};

export const inputAskForRestart = () => {
  return readLineAsync("\n다시 시작하시겠습니까? (y/n)");
};
