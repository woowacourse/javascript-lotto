import { ERROR_MESSAGE, LOTTO } from "../constants/index.js";

const isFloatPrice = (price) => parseInt(price, 10) !== price;

const isNegativeNumber = (price) => price < 0;

const isLessThanAThousand = (price) => price < LOTTO.PRICE;

const isOverwritten = (lottos) => lottos.length !== 0;

export const getPriceInputErrorMessage = (price, lottos) => {
  if (isFloatPrice(price)) {
    return ERROR_MESSAGE.PRICE_CANNOT_BE_FLOAT;
  }

  if (isNegativeNumber(price)) {
    return ERROR_MESSAGE.PRICE_CANNOT_BE_NEGATIVE;
  }

  if (isLessThanAThousand(price)) {
    return ERROR_MESSAGE.PRICE_CANNOT_BE_LESS_THAN_THOUSAND;
  }

  if (isOverwritten(lottos)) {
    return ERROR_MESSAGE.PRICE_CANNOT_BE_OVERWRITTEN;
  }

  return null;
};
