export const SELECTOR = Object.freeze({
  CASH_INPUT_SECTION_CLASS: '.cash-input-section',
  CASH_INPUT_CLASS: '.cash-input',
  CASH_INPUT_BUTTON_CLASSNAME: 'cash-input-button',

  PURCHASED_LOTTO_SECTION_CLASS: '.purchased-lotto-section',
  WINNER_NUMBER_SECTION_CLASS: '.winner-number-section',

  LOTTO_SHOW_CONTAINER_CLASS: '.lotto-show-container',
  LOTTO_NUMBER_CONTAINER_CLASS: '.lotto-number-container',

  LOTTO_CLASSNAME: 'lotto',
  LOTTO_IMAGE_CLASSNAME: 'lotto-image',
  LOTTO_NUMBERS_CLASSNAME: 'lotto-numbers',

  HIDE_CLASSNAME: 'hide',
});

export const LOTTO_PRICE = 1000;
export const CASH_INPUT_RANGE = Object.freeze({
  MIN: 1000,
  MAX: 50000,
});

export const ERROR_MESSAGE = Object.freeze({
  EMPTY_INPUT_MESSAGE: '구입할 금액을 입력해주세요!',
  INVALID_UNIT_MESSAGE: `${LOTTO_PRICE}원 단위로 구입이 가능합니다.`,
  OUT_OF_RANGE_MESSAGE: `${CASH_INPUT_RANGE.MIN}원-${CASH_INPUT_RANGE.MAX}원 사이의 금액을 입력해주세요.`,
});
