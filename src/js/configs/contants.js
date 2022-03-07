export const LOTTO = {
  PRICE: 1000,
  NUMBER_LENGTH: 6,
  NUMBER_RANGE: {
    MIN: 1,
    MAX: 45,
  },
};

export const PAYMENT = {
  PURCHASE_AMOUNT: {
    MIN: 1000,
    MAX: 100000,
  },
};

export const STATISTIC = {
  three: {
    number: 3,
    winnings: 5000,
    numberString: 'three',
  },
  four: {
    number: 4,
    winnings: 50000,
    numberString: 'four',
  },
  five: {
    number: 5,
    winnings: 1500000,
    numberString: 'five',
  },
  fiveBonus: {
    number: 5.5,
    winnings: 30000000,
    numberString: 'fiveBonus',
  },
  six: {
    number: 6,
    winnings: 2000000000,
    numberString: 'six',
  },
};

export const ERROR_MESSAGE = {
  NOT_A_AMOUNT_NUMBER: `입력된 금액이 숫자가 아닙니다. ${PAYMENT.PURCHASE_AMOUNT.MIN} 이상 ${PAYMENT.PURCHASE_AMOUNT.MAX} 이하의 금액을 입력해주세요.`,
  OUT_OF_MIN_AMOUNT_RANGE: `로또의 1개의 가격은 ${LOTTO.PRICE} 입니다. ${PAYMENT.PURCHASE_AMOUNT.MIN} 이상의 금액을 입력해주세요.`,
  OUT_OF_MAX_AMOUNT_RANGE: `최대 입력 금액은 ${PAYMENT.PURCHASE_AMOUNT.MAX} 입니다. ${PAYMENT.PURCHASE_AMOUNT.MAX} 이하의 금액을 입력해주세요.`,
  NOT_A_LOTTO_NUMBER: `입력된 당첨 번호가 유효하지 않습니다. ${LOTTO.NUMBER_RANGE.MIN}부터 ${LOTTO.NUMBER_RANGE.MAX}까지의 정수를 입력해주세요.`,
  NOT_A_BONUS_NUMBER: `입력된 보너스 번호가 유효하지 않습니다. ${LOTTO.NUMBER_RANGE.MIN}부터 ${LOTTO.NUMBER_RANGE.MAX}까지의 정수를 입력해주세요.`,
  IS_DUPLICATED: `당첨번호가 중복되었습니다. 중복없이 번호를 입력해주세요.`,
  IS_DUPLICATED_BONUS: `당첨번호와 보너스 번호가 중복됩니다. 중복없이 입력해주세요.`,
  DID_NOT_BUY_LOTTO: `구입한 로또가 없습니다. 로또를 먼저 구입해주세요.`,
};

export const DOM_STRING = {
  BLIND: 'blind',
};

export const SELECTOR = {
  APP: '#app',
  PAYMENT_SECTION: '#payment-section',
  TICKET_SECTION: '#ticket-section',
  WINNING_NUMBER_SECTION: '#winning-number-section',
  PAYMENT_INPUT: '#payment-input',
  PAYMENT_SUBMIT: '#payment-submit',
  SWITCH: '.switch',
  TICKET_LIST_WRAP: '#ticket-list-wrap',
  TICKET_LIST: '#ticket-list',
  TICKET_LIST_COLUMN: '.ticket-list-column',
  TICKET_LIST_ROW: '.ticket-list-row',
  TICKET: '.ticket',
  SHOW_NUMBER_TOGGLE_AREA: '#show-number-toggle-area',
  WINNING_NUMBER_INPUT: '.winning-number-input',
  BONUS_NUMBER_INPUT: '#bonus-number-input',
  SHOW_RESULT_BUTTON: '#show-result-button',
  WINNING_NUMBER_SECTION_RESET_BUTTON: '#winning-number-section-reset-button',
  STATISTIC_SECTION_WRAP: '#statistic-section-wrap',
  STATISTIC_SECTION: '#statistic-section',
  CLOSE_BUTTON: '#close-button',
  STATISTIC_SECTION_RESET_BUTTON: '#statistic-section-reset-button',
};
