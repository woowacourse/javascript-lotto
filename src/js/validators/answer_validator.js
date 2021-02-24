class AnswerValidator {
  static isLessFilled(numbers) {
    return numbers.some((number) => isNaN(number))
  }

  static isDuplicated(numbers) {
    return new Set(numbers).size !== 7
  }

  static isOutLottoRange(numbers) {
    return numbers.some((number) => number < 1 || number > 45)
  }

  static isFloat(numbers) {
    return numbers.some((number) => parseInt(number, 10) !== number)
  }
}

export default AnswerValidator
