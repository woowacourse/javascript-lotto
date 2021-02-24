import { ERROR_MESSAGE, TICKET } from "../constants/constant.js"

class PriceValidator {
  static isFloat(value) {
    return parseInt(value, 10) !== value
  }

  static isNegative(value) {
    return value < 0
  }

  static isLessThanTicketPrice(value) {
    return value < TICKET.PRICE
  }
}

export default PriceValidator
