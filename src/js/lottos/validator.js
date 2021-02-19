import { ERROR_MESSAGE, LOTTO } from "./constant.js";

class PriceValidator {
  static isFloatPrice(price) {
    return parseInt(price, 10) !== price;
  }

  static isNegativeNumber(price) {
    return price < 0;
  }

  static isLessThanAThousand(price) {
    return price < LOTTO.PRICE;
  }

  static isOverwritten(lottos) {
    return lottos.length !== 0;
  }

  isValid(price, lottos) {
    if (PriceValidator.isFloatPrice(price)) {
      return ERROR_MESSAGE.PRICE_CANNOT_BE_FLOAT;
    }

    if (PriceValidator.isNegativeNumber(price)) {
      return ERROR_MESSAGE.PRICE_CANNOT_BE_NEGATIVE;
    }

    if (PriceValidator.isLessThanAThousand(price)) {
      return ERROR_MESSAGE.PRICE_CANNOT_BE_LESS_THAN_THOUSAND;
    }

    if (PriceValidator.isOverwritten(lottos)) {
      return ERROR_MESSAGE.PRICE_CANNOT_BE_OVERWRITTEN;
    }

    return null;
  }
}

export default PriceValidator;
