import { ERROR_MESSAGE } from "../constants/constant.js"
import AnswerValidator from "./answer_validator.js"
import PriceValidator from "./price_validator.js"

export const checkPriceValid = (price) => {
  if (PriceValidator.isFloat(price)) {
    return ERROR_MESSAGE.PRICE_CANNOT_BE_FLOAT
  }

  if (PriceValidator.isNegative(price)) {
    return ERROR_MESSAGE.PRICE_CANNOT_BE_NEGATIVE
  }

  if (PriceValidator.isLessThanTicketPrice(price)) {
    return ERROR_MESSAGE.PRICE_CANNOT_BE_LESS_THAN_THOUSAND
  }

  return ""
}

export const checkAnswerValid = (numbers, bonus) => {
  const answers = [...numbers, bonus]

  if (AnswerValidator.isLessFilled(answers)) {
    return ERROR_MESSAGE.ANSWER_CANNOT_BE_EMPTY
  }

  if (AnswerValidator.isDuplicated(answers)) {
    return ERROR_MESSAGE.ANSWER_CANNOT_BE_DUPLICATED
  }

  if (AnswerValidator.isOutLottoRange(answers)) {
    return ERROR_MESSAGE.ANSWER_CANNOT_BE_OUT_RANGE
  }

  if (AnswerValidator.isFloat(answers)) {
    return ERROR_MESSAGE.ANSWER_CANNOT_BE_FLOAT
  }

  return ""
}
