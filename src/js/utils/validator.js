import { LOTTO_NUMBERS, ALERT_MESSAGE } from '../constants/index';

const validator = Object.freeze({
  isDividedThousand: (value) => value % LOTTO_NUMBERS.LOTTO_PRICE === 0,

  isOverThousand: (value) => value >= LOTTO_NUMBERS.LOTTO_PRICE,

  isNumber: (value) => Number.isInteger(value),

  isOverMaxLottoCount: (value) => value > LOTTO_NUMBERS.CAN_BUY_MAX_PRICE,

  isWinningNumbersDuplicate: (lottoNumbers) => new Set(lottoNumbers).size !== 7,

  isAllNumber: (lottoNumbers) => lottoNumbers.every((lottoNumber) => typeof lottoNumber === 'number'),

  isWinningNumbersOverRange: (lottoNumbers) => lottoNumbers.some((lottoNumber) => lottoNumber > 45 || lottoNumber < 1),

  isWinningNumbersAllInput: (lottoNumbers) => lottoNumbers.filter((lottoNumber) => !isNaN(lottoNumber)).length === 7,
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
    throw Error('당첨번호가 모두 입력되지 않았습니다.');
  }
  if (validator.isWinningNumbersOverRange(lottoNumbers)) {
    throw Error('로또번호는 1부터 45까지의 숫자만 입력할 수 있습니다.');
  }

  if (validator.isWinningNumbersDuplicate(lottoNumbers)) {
    throw Error('중복된 번호를 입력하면 안됩니다.');
  }
};
