export const MIN_CHARGE_INPUT = 1000;
export const MAX_CHARGE_INPUT = 5000;

export const LOTTO_PRICE = 1000;
export const LOTTO_NUMBER = {
  MIN: 1,
  MAX: 45,
  LENGTH: 6,
};

export const ERROR_MESSAGE = {
  INTEGER_CHARGE_INPUT: '구입할 금액은 정수로 입력해주세요.',
  CHARGE_INPUT_RANGE: `구입할 금액은 ${MIN_CHARGE_INPUT}원 이상, ${MAX_CHARGE_INPUT}원 이하로 입력해주세요. `,
};

export const SELECTOR = {
  CHARGE_SUBMIT_FORM: '#charge-submit-form',
  CHARGE_INPUT: '#charge-input',
  SHOW_NUMBER_TOGGLE_INPUT: '#show-number-toggle-input',
  LOTTO_LIST_NUMBER: '#lotto-list-number',
  LOTTO_TOTAL_NUMBER: '#lotto-total-number',
  LOTTO_LIST_ICON: '#lotto-list-icon',
  WINNING_NUMBER_FORM: '#winning-number-form',

  WINNING_NUMBER_INPUT: '.winning-number-input'
};
