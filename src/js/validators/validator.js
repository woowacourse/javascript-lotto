import { ERROR_MESSAGE } from "../constants/constant.js"
import LottoNumberValidator from "./lotto_number_validator.js"
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

export const checkLottoNumberValid = (lottos) => {
  if (LottoNumberValidator.isLessFilled(lottos)) {
    return ERROR_MESSAGE.LOTTO_CANNOT_BE_EMPTY
  }

  if (LottoNumberValidator.isDuplicated(lottos)) {
    return ERROR_MESSAGE.LOTTO_CANNOT_BE_DUPLICATED
  }

  if (LottoNumberValidator.isOutLottoRange(lottos)) {
    return ERROR_MESSAGE.LOTTO_CANNOT_BE_OUT_RANGE
  }

  if (LottoNumberValidator.isFloat(lottos)) {
    return ERROR_MESSAGE.LOTTO_CANNOT_BE_FLOAT
  }

  return ""
}
