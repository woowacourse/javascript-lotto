export const LOTTO_PRICE = 1000;
export const LOTTO_NUMBER = {
  MIN: 1,
  MAX: 45,
  MAX_NUMBER_LENGTH: 2,
  LENGTH: 6,
  BONUS_NUMBER_LENGTH: 1,
};

export const ERROR_MESSAGE = {
  INTEGER_CHARGE_INPUT: '구입할 금액은 정수로 입력해주세요.',
  MIN_CHARGE_INPUT: `구입할 금액을 ${LOTTO_PRICE}원 이상 입력해주세요.`,
  INTEGER_WINNER_NUMBER: '당첨 번호를 정수로 입력해주세요.',
  RANGE_OF_WINNER_NUMBER: `${LOTTO_NUMBER.MIN} ~ ${LOTTO_NUMBER.MAX} 사이의 숫자를 입력해주세요.`,
  NON_DUPLICATE_WINNER_NUMBERS: '중복된 숫자가 없는 당첨 번호를 입력해주세요.',
};

export const SELECTOR = {
  CHARGE_SUBMIT_FORM: '#charge-submit-form',
  CHARGE_INPUT: '#charge-input',
  PURCHASED_BUTTON: '#purchased-button',
  SHOW_NUMBER_TOGGLE_INPUT: '#show-number-toggle-input',
  LOTTO_LIST_NUMBER: '#lotto-list-number',
  LOTTO_TOTAL_NUMBER: '#lotto-total-number',
  LOTTO_LIST_ICON: '#lotto-list-icon',
  WINNER_NUMBER_SUBMIT_FORM: '#winner-number-submit-form',
  CHECK_RESULT_BUTTON: '#check-result-button',
  LOTTO_RESULT_MODAL: '#lotto-result-modal',
  CLOSE_RESULT_MODAL: '#close-result-modal',
  LOTTO_RESULT_TBODY: '#lotto-result-tbody',
  RATE_OF_RETURN: '#rate-of-return',
  LOTTO_RESTART_BUTTON: '#lotto-restart-button',
};

export const ID = {
  LOTTO_RESULT_MODAL: 'lotto-result-modal',
};

export const MIN_MATCH_NUMBER_FOR_PRIZE = 3;

export const MATCH_WINNING_NUMBER_INDEX = {
  3: 0,
  4: 1,
  5: 2,
  '5_AND_BONUS_MATCH': 3,
  6: 4,
};

export const LOTTO_PRIZE = {
  0: 5000,
  1: 50000,
  2: 1500000,
  3: 30000000,
  4: 2000000000,
};
