import { LOTTO_NUMBERS, ALERT_MESSAGE } from '../constants/index';

const validator = Object.freeze({
  isDividedThousand: (value) => value % LOTTO_NUMBERS.LOTTO_PRICE === 0,

  isOverThousand: (value) => value >= LOTTO_NUMBERS.LOTTO_PRICE,

  isNumber: (value) => Number.isInteger(value),

  isOverMaxLottoCount: (value) => value > LOTTO_NUMBERS.CAN_BUY_MAX_PRICE,

  isWinningNumbersDuplicate: (lottoNumbers) => new Set(lottoNumbers).size !== LOTTO_NUMBERS.WINNING_LOTTO_LENGTH,

  isAllNumber: (lottoNumbers) => lottoNumbers.every((lottoNumber) => typeof lottoNumber === 'number'),

  isWinningNumbersOverRange: (lottoNumbers) => lottoNumbers.some((lottoNumber) => lottoNumber > LOTTO_NUMBERS.MAX_LOTTO_NUMBER || lottoNumber < LOTTO_NUMBERS.MIN_LOTTO_NUMBER),

  isWinningNumbersAllInput: (lottoNumbers) => lottoNumbers.filter((lottoNumber) => !isNaN(lottoNumber)).length === LOTTO_NUMBERS.WINNING_LOTTO_LENGTH,
});

export const checkValidLottoCount = (value) => {
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

export const checkValidWinningLottoNumbers = (lottoNumbers) => {
  if (!validator.isWinningNumbersAllInput(lottoNumbers)) {
    throw Error(ALERT_MESSAGE.IS_NOT_INPUT_ALL);
  }
  if (validator.isWinningNumbersOverRange(lottoNumbers)) {
    throw Error(ALERT_MESSAGE.OUT_OF_RANGE);
  }

  if (validator.isWinningNumbersDuplicate(lottoNumbers)) {
    throw Error(ALERT_MESSAGE.DUPLICATED_NUMBERS);
  }
};
