import { LOTTO_NUMBERS, ALERT_MESSAGE } from '../constants/index';

const validator = Object.freeze({
  isDividedThousand: (value) => value % LOTTO_NUMBERS.LOTTO_PRICE === 0,

  isOverThousand: (value) => value >= LOTTO_NUMBERS.LOTTO_PRICE,

  isNumber: (value) => Number.isInteger(value),
});

const checkValidLottoCount = (value) => {
  if (!validator.isNumber(value)) {
    throw Error(ALERT_MESSAGE.MUST_NUMBER);
  }
  if (!validator.isOverThousand(value)) {
    throw Error(ALERT_MESSAGE.OVER_THOUSAND_INPUT);
  }
  if (!validator.isDividedThousand(value)) {
    throw Error(ALERT_MESSAGE.DIVIDED_BY_THOUSAND);
  }
};

export default checkValidLottoCount;
