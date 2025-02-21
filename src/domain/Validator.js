import { ListChecker, NumberChecker, StringChecker } from "../Checkers.js";
import Constants from "../constant/Constants.js";

class Validator {
  static isPrice(priceString) {
    if (!StringChecker.isRegString(priceString, /^[0-9]+$/))
      throw new Error(Constants.ERROR.PRICE_TYPE);
    if (!NumberChecker.isUnitNumber(Number(priceString), Constants.LOTTO.UNIT))
      throw new Error(Constants.ERROR.PRICE_UNIT);
  }

  static isTargetNumber(targetNumberString) {
    const targetArray = targetNumberString
      .split(Constants.OPERATOR.SEPARATOR)
      .map((a) => a.trim());
    if (!ListChecker.isDefineLength(targetArray, 6))
      throw new Error(Constants.ERROR.TARGET_NUMBER_LENGTH);
    if (targetArray.some(num => 
        !StringChecker.isRegString(num, /^[0-9]+$/) ||
        NumberChecker.isMoreThan(Number(num), Constants.LOTTO.MAX_NUMBER) ||
        NumberChecker.isLessThan(Number(num), Constants.LOTTO.MIN_NUMBER)
    ))
      throw new Error(Constants.ERROR.LOTTO_NUMBER_RANGE);
  }

  static isBonusNumber(bonusNumberString, targetNumber) {
    if (!StringChecker.isRegString(bonusNumberString, /^[0-9]+$/))
      throw new Error(Constants.ERROR.BONUS_NUMBER_TYPE);
    if (NumberChecker.isMoreThan(Number(bonusNumberString), 45))
      throw new Error(Constants.ERROR.BONUS_NUMBER_RANGE);
    if (NumberChecker.isLessThan(Number(bonusNumberString), 1))
      throw new Error(Constants.ERROR.BONUS_NUMBER_RANGE);

    if (ListChecker.includeValue(targetNumber, Number(bonusNumberString)))
      throw new Error(Constants.ERROR.BONUS_NUMBER_DUPLICATE);
  }

  static isRestartString(restartString) {
    if (
      !StringChecker.isExactString(restartString, "y") &&
      !StringChecker.isExactString(restartString, "n")
    )
      throw new Error(Constants.ERROR.RESTART_STRING);
  }
}

export default Validator;
