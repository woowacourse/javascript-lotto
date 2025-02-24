import { ERROR_MESSAGE, LOTTO } from "../../config/const.js";

class Validate {
  purchaseUnit(price) {
    if (price % LOTTO.PURCHASE.unit !== 0) {
      throw new Error(ERROR_MESSAGE.purchaseUnit);
    }
  }

  isNumeric(input) {
    if (Number.isNaN(Number(input))) {
      throw new Error(ERROR_MESSAGE.isNumeric);
    }
  }

  minimumValue(input) {
    if (input < LOTTO.PURCHASE.unit) {
      throw new Error(ERROR_MESSAGE.minimumValue);
    }
  }

  maximumValue(input) {
    if (input > LOTTO.PURCHASE.maxThreshold) {
      throw new Error(ERROR_MESSAGE.maximumValue);
    }
  }

  winningNumberisNumeric(input) {
    input.forEach((number) => {
      if (Number.isNaN(Number(number))) {
        throw new Error(ERROR_MESSAGE.winningNumberisNumeric);
      }
    });
  }

  lottoNumberRange(input) {
    if (input < LOTTO.RANGE.min || input > LOTTO.RANGE.max) {
      throw new Error(ERROR_MESSAGE.lottoNumberRange);
    }
  }

  winningNumberDuplicate(input) {
    if (input.length !== new Set(input).size) {
      throw new Error(ERROR_MESSAGE.winningNumberDuplicate);
    }
  }

  bonusNumberUnique(winningNumber, bonusNumber) {
    if (winningNumber.includes(bonusNumber))
      throw new Error(ERROR_MESSAGE.bonusNumberUnique);
  }

  restartInput(input) {
    if (input !== "y" && input !== "n")
      throw new Error(ERROR_MESSAGE.restartInput);
  }

  winningNumbersLength(winningNumber) {
    if (winningNumber.length !== LOTTO.maxLength) {
      throw new Error(ERROR_MESSAGE.winningNumbersLength);
    }
  }
}
export default Validate;
