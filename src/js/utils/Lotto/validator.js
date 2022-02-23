import { isDivisible, isPositiveInteger } from '../validator';
import { LOTTO_SETTING } from '../../constants/setting';
import { ERROR_MESSAGE } from '../../constants/string';

export const checkValidMoneyInput = (money) => {
  if (!isPositiveInteger(money)) {
    throw new Error(ERROR_MESSAGE.NOT_POSITIVE_NUMBER_INPUT);
  }

  if (!isDivisible(money, LOTTO_SETTING.PRICE)) {
    throw new Error(ERROR_MESSAGE.WRONG_LOTTO_PRICE_UNIT_INPUT);
  }
};
