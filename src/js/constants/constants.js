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

export const ERROR_MESSAGE = Object.freeze({
  EMPTY_INPUT: '구입할 금액을 입력해주세요!',
  INVALID_UNIT: `${LOTTO_PRICE}원 단위로 구입이 가능합니다.`,
  OUT_OF_RANGE: `${CASH_INPUT_RANGE.MIN}원-${CASH_INPUT_RANGE.MAX}원 사이의 금액을 입력해주세요.`,
});

export const LOTTO_IMAGE = '🎟️';
export const DISABLED_PURCHASE_BUTTON_TEXT = '구입완료';
