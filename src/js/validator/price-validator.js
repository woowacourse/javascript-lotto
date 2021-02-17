import { ERROR_MESSAGE, LOTTO } from "../constant.js";
class PriceValidator {
  isFloatPrice(price) {
    return parseInt(price, 10) !== price;
  }

  isNegativeNumber(price) {
    return price < 0;
  }

  isLessThanAThousand(price) {
    return price < LOTTO.PRICE;
  }

  isOverwritten(lottos) {
    return lottos.length !== 0;
  }

  isValid(price, lottos) {
    if (this.isFloatPrice(price)) {
      return ERROR_MESSAGE.PRICE_CANNOT_BE_FLOAT;
    }

    if (this.isNegativeNumber(price)) {
      return ERROR_MESSAGE.PRICE_CANNOT_BE_NEGATIVE;
    }

    if (this.isLessThanAThousand(price)) {
      return ERROR_MESSAGE.PRICE_CANNOT_BE_LESS_THAN_THOUSAND;
    }

    if (this.isOverwritten(lottos)) {
      return ERROR_MESSAGE.PRICE_CANNOT_BE_OVERWRITTEN;
    }

    return null;
  }
}

export default PriceValidator;
