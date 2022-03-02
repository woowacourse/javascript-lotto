export const LOTTO_RULE = {
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  NUMBERS_COUNT: 6,
};

export const ID_SELECTOR = {
  APP: '#app',
  PURCHASE_FORM: '#purchase-form',
  PURCHASE_INPUT: '#purchase-input',
  LOTTO_LIST_DESCRIPTION: '#lotto-list-description',
  TOGGLE: '#toggle',
  TOGGLE_INPUT: '#toggle-input',
  LOTTO_LISTS: '#lotto-lists',
  LOTTO_LIST_SECTION: '#lotto-list-section',
  WINNING_NUMBERS_SECTION: '#winning-numbers-section',
  WINNING_NUMBERS_FORM: '#winning-numbers-form',
  MODAL_CONTAINER: '#modal-container',
  MODAL_CLOSE: '#modal-close',
  LOTTO_RESULT: '#lotto-result',
  PROFIT_DESCRIPTION: '#profit-description',
  RESTART_BUTTON: '#restart-lotto',
};

export const ID_NAME = {
  MODAL_CONTAINER: 'modal-container',
  MODAL_CLOSE: 'modal-close',
};
export const CLASS_NAME = {
  LOTTO_LIST_SECTION_DISPLAY_NONE: 'lotto-list__section-display-none',
  LOTTO_LIST: 'lotto-list',
  LOTTO_LIST_TICKET: 'lotto-list__ticket',
  LOTTO_LIST_NUMBERS: 'lotto-list__numbers',
  UNFOLD: 'unfold',
  WINNING_NUMBERS_SECTION_DISPLAY_NONE: 'winning-numbers__section-display-none',
  MODAL_OPEN: 'modal__open',
};

export const LOTTO_PRICE = 1000;

export const ALERT_MESSAGE = {
  NOT_DIVISIBLE: `${LOTTO_PRICE}으로 나누어떨어지는 금액을 입력해주세요.`,
  DUPLICATED_NUMBERS: '서로 다른 숫자를 입력해주세요 !',
};

export const RANK_BY_MATCHING_NUMBERS = {
  6: 1,
  bonus: 2,
  5: 3,
  4: 4,
  3: 5,
};

export const PRIZE_BY_RANK = {
  1: 2000000000,
  2: 30000000,
  3: 1500000,
  4: 50000,
  5: 5000,
  LOSE: 0,
};
