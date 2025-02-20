import { ListChecker, NumberChecker, StringChecker } from "../Checkers.js";

class Validator {
  static isPrice(priceString) {
    if (!StringChecker.isRegString(priceString, /^[0-9]+$/))
      throw new Error("[ERROR]금액은 숫자로 입력해야 한다.");
    if (!NumberChecker.isUnitNumber(Number(priceString), 1000))
      throw new Error("[ERROR]금액은 1,000원으로 나누어 떨어져야 한다.");
  }

  static isTargetNumber(targetNumberString) {
    const targetArray = targetNumberString.split(",").map((a) => a.trim());
    if (!ListChecker.isDefineLength(targetArray, 6))
      throw new Error("[ERROR]당첨번호는 쉼표로 구분되어야 한다.");
    targetArray.forEach((num) => {
      if (NumberChecker.isMoreThan(Number(num), 45))
        throw new Error("[ERROR]당첨번호의 범위는 1~45이어야한다.");
      if (NumberChecker.isLessThan(Number(num), 1))
        throw new Error("[ERROR]당첨번호의 범위는 1~45이어야한다.");
    });
  }

  static isBonusNumber(bonusNumberString, targetNumber) {
    if (!StringChecker.isRegString(bonusNumberString, /^[0-9]+$/))
      throw new Error("[ERROR]보너스 번호는 숫자이어야 한다.");
    if (NumberChecker.isMoreThan(Number(bonusNumberString), 45))
      throw new Error("[ERROR]당첨번호의 범위는 1~45이어야한다.");
    if (NumberChecker.isLessThan(Number(bonusNumberString), 1))
      throw new Error("[ERROR]당첨번호의 범위는 1~45이어야한다.");

    if (ListChecker.includeValue(targetNumber, Number(bonusNumberString)))
      throw new Error("[ERROR] 보너스 번호는 당첨번호와 중복될수 없다.");
  }

  static isRestartString(restartString) {
    if (
      !StringChecker.isExactString(restartString, "y") &&
      !StringChecker.isExactString(restartString, "n")
    )
      throw new Error("[ERROR]다시 시작하기 위한 입력은 y또는 n이어야 한다.");
  }
}

export default Validator;
