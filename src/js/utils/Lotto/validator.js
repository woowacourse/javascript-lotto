import { isDivisible, isPositiveInteger } from '../validator.js';
import { LOTTO_SETTING } from '../../constants/setting.js';
import { ERROR_MESSAGE } from '../../constants/string.js';

export const checkValidMoneyInput = (money) => {
  if (!isPositiveInteger(money)) {
    throw new Error(ERROR_MESSAGE.NOT_POSITIVE_NUMBER_INPUT);
  }

  if (!isDivisible(money, LOTTO_SETTING.PRICE)) {
    throw new Error(ERROR_MESSAGE.WRONG_LOTTO_PRICE_UNIT_INPUT);
  }
};
