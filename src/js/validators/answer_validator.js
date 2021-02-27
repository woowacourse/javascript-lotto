import { TICKET } from "../constants/constant.js"

class AnswerValidator {
  static isLessFilled(numbers) {
    return numbers.some((number) => isNaN(number))
  }

  static isDuplicated(numbers) {
    return new Set(numbers).size !== TICKET.SIZE + TICKET.BONUS_SIZE
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

export default AnswerValidator
