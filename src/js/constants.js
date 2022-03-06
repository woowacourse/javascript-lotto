export const SELECTOR = {
  PAYMENT_BUTTON: '#payment-button',
  PAYMENT_INPUT: '#payment-input',
  LOTTO_LIST_TOGGLE_BUTTON: '#lotto-list-toggle-button',
  LOTTO_LIST: '#lotto-list',
  LOTTO_NUMBER: '.lotto-number',
  LOTTO: '.lotto',
  LAST_WEEK_WINNING_NUMBER_SECTION: '#last-week-winning-number-section',
  PURCHASED_TOTAL_COUNT: '.purchased-total-count',
  RESULT_CHECKING_BUTTON: '#result-checking-button',
  PURCHASED_LOTTO_LIST_SECTION: '#purchased-lotto-list-section',
  LOTTO_RESULT_SECTION: '#lotto-result-section',
  COVER_THE_BACKGROUND: '#cover-the-background',
  LAST_WEEK_NUMBER_INPUT: '.last-week-number-input',
  LAST_WEEK_BONUS_NUMBER_INPUT: '.last-week-bonus-number-input',
  RESTART_BUTTON: '#restart-button',
  EXIT_BUTTON: '#exit-button',
  WINNING_NUMBER_CONTAINER: '.winning-number-container',
  WINNING_NUMBERS: '.winning-numbers',
};

export const CLASS_NAME = {
  DISABLED: 'disabled',
  TOGGLE_SWITCH: 'toggle-switch',
  DIRECTION_COLUMN: 'direction-column',
  DISPLAY_FLEX: 'display-flex',
  INVISIBLE: 'invisible',
};

export const MONEY_STANDARD = 1000;

export const LOTTO = {
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  LENGTH: 6,
};

export const WINNING_AMOUNT = {
  FIRST_WINNER: 2000000000,
  SECOND_WINNER: 30000000,
  THIRD_WINNER: 1500000,
  FORTH_WINNER: 50000,
  FIFTH_WINNER: 5000,
  FAILED: 0,
};

export const ERROR_MESSAGE = {
  MONEY_OUT_OF_RANGE: `구입할 금액을 잘못 입력 하셨습니다. 구입할 금액은 ${MONEY_STANDARD}원 이상을 입력해주셔야 합니다`,
  MONEY_OUT_OF_STANDARD: `구입할 금액을 잘못 입력 하셨습니다. 구입할 금액은 ${MONEY_STANDARD}원 단위로 입력해주셔야 합니다`,
  NOT_DUPLICATED_NUMBERS: `지난주 당첨 번호는 ${LOTTO.MIN_NUMBER} ~ ${LOTTO.MAX_NUMBER} 사이의 숫자를 중복 없이 입력해주셔야 합니다.`,
};
