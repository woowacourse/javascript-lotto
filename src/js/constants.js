export const LOTTO_RULE = {
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  NUMBERS_COUNT: 6,
  TOTAL_NUMBER_COUNT: 7,
};

export const ID_SELECTOR = {
  APP: '#app',
  PURCHASE_FORM: '#purchase-form',
  PURCHASE_INPUT: '#purchase-input',
  PURCHASE_SUBMIT_BUTTON: '#purhchase-submit-button',
  LOTTO_LIST_DESCRIPTION: '#lotto-list-description',
  TOGGLE: '#toggle',
  TOGGLE_INPUT: '#toggle-input',
  LOTTO_LISTS: '#lotto-lists',
  LOTTO_LIST_SECTION: '#lotto-list-section',
  WINNING_NUMBERS_SECTION: '#winning-numbers-section',
  WINNING_NUMBERS_FORM: '#winning-numbers-form',
  REGULAR_NUMBER_INPUT: '#regular-number',
  BONUS_NUMBER_INPUT: '#bonus-number',
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
  LOTTO_LIST: 'lotto-list',
  LOTTO_LIST_TICKET: 'lotto-list__ticket',
  LOTTO_LIST_NUMBERS: 'lotto-list__numbers',
  UNFOLD: 'unfold',
  MODAL_OPEN: 'modal__open',
  HIDE: 'hide',
};

export const LOTTO_PRICE = 1000;

export const ERROR_NAME = {
  NOT_DIVISIBLE_NUMBER: 'NOT_DIVISIBLE_NUMBER',
  DUPLICATED_NUMBERS: 'DUPLICATED_NUMBERS',
};

export const ERROR_MESSAGE = {
  NOT_DIVISIBLE_NUMBER: `${LOTTO_PRICE}으로 나누어떨어지는 금액을 입력해주세요.`,
  DUPLICATED_NUMBERS: '서로 다른 숫자를 입력해주세요 !',
  UNKNOWN_ERROR: '죄송합니다. 잠시 후에 다시 시도해주세요.',
};

export const MATCHING_NUMBER_BY_RANK = {
  5: '3개',
  4: '4개',
  3: '5개',
  2: '5개 + 보너스번호 ',
  1: '6개',
};

export const RANK_BY_MATCHING_NUMBERS = {
  6: 1,
  BONUSED_WINNER: 2,
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

export const PRIZE_STRING_BY_RANK = {
  1: '2,000,000,000',
  2: '30,000,000',
  3: '1,500,000',
  4: '50,000',
  5: '5,000',
};
