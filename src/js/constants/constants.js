export const CLASSNAME = Object.freeze({
  CASH_INPUT_BUTTON: 'cash-input-button',

  LOTTO: 'lotto',
  LOTTO_IMAGE: 'lotto-image',
  LOTTO_NUMBERS: 'lotto-numbers',

  HIDE: 'hide',
  HIDE_NUMBERS: 'hide-numbers',
});

/* 로또 게임 관련 */
export const LOTTO_PRICE = 1000;
export const CASH_INPUT_RANGE = Object.freeze({
  MIN: 1000,
  MAX: 50000,
});
export const LOTTO_NUMBER_COUNT = 6;
export const LOTTO_NUMBER_RANGE = Object.freeze({
  MIN: 1,
  MAX: 45,
});

export const WINNING_AMOUNT = {
  MIN: 0,
  3: 5000,
  4: 50000,
  5: 1500000,
  6: 2000000000,
  BONUS: 30000000,
};

export const ERROR_MESSAGE = Object.freeze({
  NOT_A_NUMBER_CASH_INPUT: '구입할 금액을 입력해주세요.',
  OUT_OF_CASH_RANGE: `${CASH_INPUT_RANGE.MIN}원-${CASH_INPUT_RANGE.MAX}원 사이의 금액을 입력해주세요.`,
  INVALID_CASH_UNIT: `${LOTTO_PRICE}원 단위로 구입이 가능합니다.`,

  NOT_A_NUMBER_WINNER_NUMBER_INPUTS: '당첨 번호와 보너스 번호를 공백 없이 모두 입력해주세요.',
  OUT_OF_NUMBERS_RANGE: `${LOTTO_NUMBER_RANGE.MIN}-${LOTTO_NUMBER_RANGE.MAX} 사이의 번호를 입력해주세요.`,
  NOT_UNIQUE_NUMBERS: '서로 다른 번호를 입력해주세요.',
});

export const LOTTO_IMAGE = '🎟️';
export const DISABLED_PURCHASE_BUTTON_TEXT = '구입완료';
