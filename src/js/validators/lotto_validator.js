import { ERROR_MESSAGE, LOTTO } from "../constants/constant.js"

class Validator {
  isPriceValid(price) {
    if (this.isFloatPrice(price)) {
      return ERROR_MESSAGE.PRICE_CANNOT_BE_FLOAT
    }

    if (this.isNegativeNumber(price)) {
      return ERROR_MESSAGE.PRICE_CANNOT_BE_NEGATIVE
    }

    if (this.isLessThanThousand(price)) {
      return ERROR_MESSAGE.PRICE_CANNOT_BE_LESS_THAN_THOUSAND
    }

    return null
  }

  isFloatPrice(price) {
    return parseInt(price, 10) !== price
  }

  isNegativeNumber(price) {
    return price < 0
  }

  isLessThanThousand(price) {
    return 0 <= price && price < LOTTO.PRICE
  }
}

export default Validator
