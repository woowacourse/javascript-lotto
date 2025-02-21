import { LOTTO } from "../../config/const.js";

class Validate {
  purchaseUnit(price) {
    if (price % LOTTO.PURCHASE.unit !== 0) {
      throw new Error(
        `구입 금액은 ${LOTTO.PURCHASE.unit}원 단위로 입력해주세요.`
      );
    }
  }

  isNumeric(input) {
    if (Number.isNaN(Number(input))) {
      throw new Error(`숫자를 입력해주세요.`);
    }
  }

  minimumValue(input) {
    if (input < LOTTO.PURCHASE.unit) {
      throw new Error(
        `구입 금액은 ${LOTTO.PURCHASE.unit.toLocaleString()}원 이상이여야 합니다.`
      );
    }
  }

  maximumValue(input) {
    if (input > LOTTO.PURCHASE.maxThreshold) {
      throw new Error(
        `구입 금액은 ${LOTTO.PURCHASE.maxThreshold.toLocaleString()}원 이하여야 합니다.`
      );
    }
  }

  winningNumberisNumeric(input) {
    input.forEach((number) => {
      if (Number.isNaN(Number(number))) {
        throw new Error(`당첨 번호는 숫자여야 합니다.`);
      }
    });
  }

  lottoNumberRange(input) {
    if (input < LOTTO.RANGE.min || input > LOTTO.RANGE.max) {
      throw new Error(
        `당첨 번호가 ${LOTTO.RANGE.min}부터 ${LOTTO.RANGE.max} 사이의 숫자여야 합니다.`
      );
    }
  }

  winningNumberDuplicate(input) {
    if (input.length !== new Set(input).size) {
      throw new Error("당첨 번호는 중복되지 않아야 합니다");
    }
  }

  bonusNumberUnique(winningNumber, bonusNumber) {
    if (winningNumber.includes(bonusNumber))
      throw new Error("보너스 번호는 당첨 번호와 중복되면 안됩니다.");
  }

  restartInput(input) {
    if (input !== "y" && input !== "n")
      throw new Error("입력은 y 또는 n만 가능합니다.");
  }

  winningNumbersLength(winningNumber) {
    if (winningNumber.length !== LOTTO.maxLength) {
      throw new Error("당첨 번호는 6개여야 합니다.");
    }
  }
}
export default Validate;
