import { TICKET } from "../constants/constant.js"

class LottoNumberValidator {
  static isLessFilled(numbers) {
    return numbers.some((number) => isNaN(number))
  }

  static isDuplicated(numbers) {
    return new Set(numbers).size !== numbers.length
  }

  static isOutLottoRange(numbers) {
    return numbers.some(
      (number) => number < TICKET.MIN_NUM || number > TICKET.MAX_NUM
    )
  }

  static isFloat(numbers) {
    return numbers.some((number) => parseInt(number, 10) !== number)
  }
}

export default LottoNumberValidator
