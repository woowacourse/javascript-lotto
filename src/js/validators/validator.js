import { ERROR_MESSAGE } from "../constants/constant.js"
import AnswerValidator from "./answer_validator.js"
import PriceValidator from "./lotto_validator.js"

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
  console.log(answers)
  if (AnswerValidator.isLessFilled(answers)) {
    return "당첨 번호를 모두 입력해주세요."
  }

  if (AnswerValidator.isDuplicated(answers)) {
    return "당첨 번호는 중복되면 안됩니다."
  }

  if (AnswerValidator.isOutLottoRange(answers)) {
    return "당첨 번호는 1이상 45이하의 숫자여야 합니다."
  }

  if (AnswerValidator.isFloat(answers)) {
    return "당첨 번호는 소수가 될 수 없습니다."
  }

  return ""
}
