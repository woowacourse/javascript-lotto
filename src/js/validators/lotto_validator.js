import { ERROR_MESSAGE, TICKET } from "../constants/constant.js"

class PriceValidator {
  checkPriceValid(price) {
    if (this.isFloat(price)) {
      return ERROR_MESSAGE.PRICE_CANNOT_BE_FLOAT
    }

    if (this.isNegative(price)) {
      return ERROR_MESSAGE.PRICE_CANNOT_BE_NEGATIVE
    }

    if (this.isLessThanTicketPrice(price)) {
      return ERROR_MESSAGE.PRICE_CANNOT_BE_LESS_THAN_THOUSAND
    }

    return ""
  }

  isFloat(value) {
    return parseInt(value, 10) !== value
  }

  isNegative(value) {
    return value < 0
  }

  isLessThanTicketPrice(value) {
    return value < TICKET.PRICE
  }
}

export default PriceValidator
