export const CLASS = {
  LOTTO_NUMBER: '.lotto-number',
  LOTTO: '.lotto',
  PURCHASED_TOTAL_COUNT: '.purchased-total-count',
  WINNING_NUMBER_INPUT: '.winning-number-input',
  WINNING_COUNT: '.winning-count',
  EARNING_WEIGHT: '.earning-weight',
  MODAL_BACKGROUND: '.modal-background',
  ERROR_TEXT: '.error-text',
};

export const ID = {
  PAYMENT_BUTTON: '#payment-button',
  PAYMENT_INPUT: '#payment-input',
  LOTTO_LIST_TOGGLE_BUTTON: '#lotto-list-toggle-button',
  LOTTO_LIST: '#lotto-list',
  WINNING_NUMBER_SECTION: '#winning-number-section',
  RESULT_CHECKING_BUTTON: '#result-checking-button',
  MODAL_CLOSE_BUTTON: '#modal-close-button',
  RESTART: '#restart',
  BONUS_NUMBER_INPUT: '#bonus-number-input',
  PURCHASED_LOTTO_LIST_SECTION: '#purchased-lotto-list-section',
};

export const CLASS_NAME = {
  DISABLED: 'disabled',
  TOGGLE_SWITCH: 'toggle-switch',
  DIRECTION_COLUMN: 'direction-column',
  INVISIBLE: 'invisible',
  HIDDEN: 'hidden',
};

export const MONEY = {
  STANDARD: 1000,
  PRIZE: [5000, 50000, 1500000, 30000000, 2000000000],
};

export const LOTTO = {
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  LENGTH: 6,
};

export const ERROR_MESSAGE = {
  MONEY_OUT_OF_RANGE: `구입할 금액을 잘못 입력 하셨습니다. 구입할 금액은 ${MONEY.STANDARD}원 이상을 입력해주셔야 합니다`,
  MONEY_OUT_OF_STANDARD: `구입할 금액을 잘못 입력 하셨습니다. 구입할 금액은 ${MONEY.STANDARD}원 단위로 입력해주셔야 합니다`,
  NUMBER_OUT_OF_RANGE: `지난주 당첨 번호또는 보너스 번호를 잘못 입력하셨습니다. ${LOTTO.MIN_NUMBER} ~ ${LOTTO.MAX_NUMBER} 사이의 숫자를 입력해주세요`,
  DUPLICATE_NUMBER: '지난주 당첨 번호와 보너스 번호를 잘못 입력하셨습니다. 서로 다른 숫자를 입력해주세요',
};
