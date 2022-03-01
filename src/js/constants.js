export const LOTTO_RULE = {
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  NUMBERS_COUNT: 6,
};

export const ID_SELECTOR = {
  APP: 'app',
  PURCHASE_FORM: 'purchase-form',
  PURCHASE_INPUT: 'purchase-input',
  LOTTO_LIST_DESCRIPTION: 'lotto-list-description',
  TOGGLE: 'toggle',
  TOGGLE_INPUT: 'toggle-input',
  LOTTO_LISTS: 'lotto-lists',
  LOTTO_LIST_SECTION: 'lotto-list-section',
  WINNING_NUMBERS_FORM: 'winning-numbers-form',
  WINNING_NUMBERS_CHECK_BUTTON: 'winning-numbers__check-button',
};

export const CLASS_SELECTOR = {
  LOTTO_LIST_SECTION_DISPLAY_NONE: 'lotto-list__section-display-none',
  LOTTO_LIST: 'lotto-list',
  LOTTO_LIST_TICKET: 'lotto-list__ticket',
  LOTTO_LIST_NUMBERS: 'lotto-list__numbers',
  UNFOLD: 'unfold',
  WINNING_NUMBER_INPUT: 'winning-number__input',
};

export const LOTTO_PRICE = 1000;

export const ALERT_MESSAGE = {
  NOT_DIVISIBLE: `${LOTTO_PRICE}으로 나누어떨어지는 금액을 입력해주세요.`,
};
