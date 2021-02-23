import { ERROR_MESSAGE } from "../constants/constant.js"
import {
  isFloatNumber,
  isNegativeNumber,
  isPositiveLessThanThousand,
} from "./priceValiator.js"

export const checkPriceValid = price => {
  if (isFloatNumber(price)) {
    return ERROR_MESSAGE.PRICE_CANNOT_BE_FLOAT
  }

  if (isNegativeNumber(price)) {
    return ERROR_MESSAGE.PRICE_CANNOT_BE_NEGATIVE
  }

  if (isPositiveLessThanThousand(price)) {
    return ERROR_MESSAGE.PRICE_CANNOT_BE_LESS_THAN_THOUSAND
  }

  return null
}
