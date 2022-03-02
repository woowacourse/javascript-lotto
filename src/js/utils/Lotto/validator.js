import { isDivisible, isPositiveInteger, isValidRangeNumber } from '../validator';
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

export const checkValidLottoNumberInput = ({ input, pickedNumbers }) => {
  if (!isPositiveInteger(input)) {
    throw new Error();
  }
  if (
    !isValidRangeNumber(LOTTO_SETTING.MIN_RANDOM_NUMBER, LOTTO_SETTING.MAX_RANDOM_NUMBER, input)
  ) {
    throw new Error();
  }
  if (pickedNumbers.length >= LOTTO_SETTING.LOTTO_NUMBER_LENGTH) {
    throw new Error();
  }
};

const isValidRangeLottoNumber = (number) =>
  isValidRangeNumber(LOTTO_SETTING.MIN_RANDOM_NUMBER, LOTTO_SETTING.MAX_RANDOM_NUMBER, number);

export const checkValidWinningNumberInput = (numbers) => {
  if (numbers.length !== 7) {
    throw new Error('빈 입력이 있습니다.');
  }
  const filters = [isPositiveInteger, isValidRangeLottoNumber];
  const isValidWinningNumber = numbers.every((number) => filters.every((func) => func(number)));
  if (!isValidWinningNumber) {
    throw new Error('올바른 로또 번호 입력이 아닙니다.');
  }
};
