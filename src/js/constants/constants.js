export const SELECTOR = Object.freeze({
  APP_ID: '#app',

  CASH_INPUT_SECTION_CLASS: '.cash-input-section',
  CASH_INPUT_CLASS: '.cash-input',
  CASH_INPUT_BUTTON_CLASS: '.cash-input-button',

  PURCHASED_LOTTO_SECTION_CLASS: '.purchased-lotto-section',
  WINNER_NUMBER_SECTION_CLASS: '.winner-number-section',

  LOTTO_CONTAINER_CLASS: '.lotto-container',
  LOTTO_GRID_CLASS: '.lotto-grid',

  SHOW_NUMBER_TOGGLE_BUTTON_CLASS: '.show-number-toggle-button',
});

export const CLASSNAMES = {
  CASH_INPUT_BUTTON_CLASSNAME: 'cash-input-button',

  LOTTO_CLASSNAME: 'lotto',
  LOTTO_IMAGE_CLASSNAME: 'lotto-image',
  LOTTO_NUMBERS_CLASSNAME: 'lotto-numbers',

  HIDE_CLASSNAME: 'hide',
  ONE_COLUMN_GRID_CLASSNAME: 'one-column-grid',

  HIDE_NUMBERS_CLASSNAME: 'hide-numbers',
};

export const DISABLED_PURCHASE_BUTTON_TEXT = '구입완료';

export const CASH_INPUT_RANGE = Object.freeze({
  MIN: 1000,
  MAX: 50000,
});

export const LOTTO_RULES = Object.freeze({
  PRICE: 1000,
  NUMBER_COUNT: 6,
  NUMBER_RANGE: { MIN: 1, MAX: 45 },
  PRIZE: Object.freeze({
    3: 5000,
    4: 50000,
    5: 1500000,
    '5+': 30000000,
    6: 2000000000,
  }),
});
export const LOTTO_IMAGE = '🎟️';

export const ERROR_MESSAGE = Object.freeze({
  EMPTY_INPUT: '구입할 금액을 입력해주세요!',
  INVALID_UNIT: `${LOTTO_RULES.PRICE}원 단위로 구입이 가능합니다.`,
  CASH_INPUT_OUT_OF_RANGE: `${CASH_INPUT_RANGE.MIN}원-${CASH_INPUT_RANGE.MAX}원 사이의 금액을 입력해주세요.`,
});
