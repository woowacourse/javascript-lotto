import { ListChecker, NumberChecker, StringChecker } from "./Checkers";

class Validator {
  // TODO: Validator를 Checker 내 함수로 구성하기
  static isMoneyFit(money) {
    if (money % 1000 !== 0)
      throw new Error("[ERROR]금액은 1,000원으로 나누어 떨어져야 한다.");
  }

  static isUniqueLotto(lottoArray) {
    const uniqueNumberSet = new Set(lottoArray);
    const uniqueNumber = uniqueNumberSet.size;
    if (uniqueNumber < 6)
      throw new Error(
        "[ERROR]로또숫자는 랜덤하고 중복되지 않는 6개 로또숫자여야한다.",
      );
  }

  static isUphillList(lottoArray) {
    let currentMaxNum = 0;
    for (let i = 0; i < lottoArray.length; i += 1) {
      if (currentMaxNum >= lottoArray[i])
        throw new Error("[ERROR]로또는 오름차순으로 정렬되어야 한다.");
      currentMaxNum = lottoArray[i];
    }
  }

  static isPrice(priceString) {
    if (StringChecker.isRegString(priceString, /^[0-9]$/))
      throw new Error("[ERROR]금액은 숫자로 입력해야 한다.");
    if (Number(priceString) % 1000 !== 0)
      throw new Error("[ERROR]금액은 1,000원으로 나누어 떨어져야 한다.");
  }

  static isTargetNumber(targetNumberString) {
    const targetArray = targetNumberString.split(",").map((a) => a.trim());
    if (!ListChecker.isDefineLength(targetArray, 6))
      throw new Error("[ERROR]당첨번호는 쉼표로 구분되어야 한다.");
    targetArray.forEach((num) => {
      if (!NumberChecker.isMoreThan(Number(num), 45))
        throw new Error("[ERROR]당첨번호의 범위는 1~45이어야한다.");
      if (!NumberChecker.isLessThan(Number(num), 1))
        throw new Error("[ERROR]당첨번호의 범위는 1~45이어야한다.");
    });
  }

  static isBonusNumber(bonusNumberString) {
    if (!StringChecker.isRegString(bonusNumberString, /^[0-9]+$/))
      throw new Error("[ERROR]보너스 번호는 숫자이어야 한다.");
    if (!NumberChecker.isMoreThan(Number(bonusNumberString), 45))
      throw new Error("[ERROR]당첨번호의 범위는 1~45이어야한다.");
    if (!NumberChecker.isLessThan(Number(bonusNumberString), 1))
      throw new Error("[ERROR]당첨번호의 범위는 1~45이어야한다.");
  }

  static isRestartString(restartString) {
    if (restartString !== "y" || restartString !== "n")
      throw new Error("[ERROR]다시 시작하기 위한 입력은 y또는 n이어야 한다.");
  }
}

export default Validator;
