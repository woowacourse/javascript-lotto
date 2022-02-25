const SELECTOR = {
  $PAYMENT_BUTTON: '#payment-button',
  $PAYMENT_INPUT: '#payment-input',
  $LOTTO_LIST_TOGGLE_BUTTON: '#lotto-list-toggle-button',
  $LOTTO_LIST: '#lotto-list',
  $LOTTO_NUMBER: '.lotto-number',
  $LOTTO: '.lotto',
  $LAST_WEEK_WINNING_NUMBER_SECTION: '#last-week-winning-number-section',
  $PURCHASED_TOTAL_COUNT: '.purchased-total-count',
  $RESULT_CHECKING_BUTTON: '#result-checking-button',
};

const DOM_STRING = {
  DISABLED: 'disabled',
  TOGGLE_SWITCH: 'toggle-switch',
  DIRECTION_COLUMN: 'direction-column',
  DISPLAY_FLEX: 'display-flex',
  INVISIBLE: 'invisible',
};

const MONEY = {
  STANDARD: 1000,
};

const ERROR_MESSAGE = {
  MONEY_OUT_OF_RANGE: `구입할 금액을 잘못 입력 하셨습니다. 구입할 금액은 ${MONEY.STANDARD}원 이상을 입력해주셔야 합니다`,
  MONEY_OUT_OF_STANDARD: `구입할 금액을 잘못 입력 하셨습니다. 구입할 금액은 ${MONEY.STANDARD}원 단위로 입력해주셔야 합니다`,
};

const LOTTO = {
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  LENGTH: 6,
};

export { SELECTOR, DOM_STRING, MONEY, ERROR_MESSAGE, LOTTO };
