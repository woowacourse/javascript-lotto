import { LOTTO_NUMBERS, ALERT_MESSAGE } from '../constants/index';

const validator = Object.freeze({
  isDividedThousand: (value) => value % LOTTO_NUMBERS.LOTTO_PRICE === 0,

  isOverThousand: (value) => value >= LOTTO_NUMBERS.LOTTO_PRICE,

  isNumber: (value) => Number.isInteger(value),

  isOverMaxLottoCount: (value) => value > LOTTO_NUMBERS.CAN_BUY_MAX_PRICE,
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
  if (validator.isOverMaxLottoCount(value)) {
    throw Error(ALERT_MESSAGE.IS_OVER_MAX_LOTTO_COUNT);
  }
};

export default checkValidLottoCount;
