export const DOM_STRING = {
  APP: 'app',
  TITLE: 'title',
  PAYMENT_SECTION: 'payment-section',
  TICKET_SECTION: 'ticket-section',
  WINNING_NUMBER_SECTION: 'winning-number-section',
  PAYMENT_INPUT: 'payment-input',
  PAYMENT_SUBMIT: 'payment-submit',
  SWITCH: 'switch',
  SLIDER: 'slider',
  TICKET_LIST_WRAP: 'ticket-list-wrap',
  TICKET_LIST: 'ticket-list',
  TICKET_LIST_COLUMN: 'ticket-list-column',
  TICKET_LIST_ROW: 'ticket-list-row',
  TICKET: 'ticket',
  TICKET_NUMBERS: 'ticket-numbers',
  SHOW_NUMBER_TOGGLE_AREA: 'show-number-toggle-area',
  WINNING_NUMBER_FIELDSET: 'winning-number-fieldset',
  WINNING_NUMBER_FORM: 'winning-number-form',
  WINNING_NUMBER_INPUT_WRAP: 'winning-number-input-wrap',
  WINNING_NUMBER_INPUT: 'winning-number-input',
  SHOW_RESULT_BUTTON: 'show-result-button',
  BONUS_NUMBER_FORM: 'bonus-number-form',
};

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
    MAX: 10000,
  },
};

export const ERROR_MESSAGE = {
  NOT_A_NUMBER: `입력된 금액이 숫자가 아닙니다. ${PAYMENT.PURCHASE_AMOUNT.MIN} 이상 ${PAYMENT.PURCHASE_AMOUNT.MAX} 이하의 금액을 입력해주세요.`,
  NOT_DIVIDED_BY_THOUSAND: `입력된 금액이 ${LOTTO.PRICE}으로 나누어 떨어지지 않습니다. ${LOTTO.PRICE}으로 나누어 떨어지는 금액을 입력해주세요.`,
  OUT_OF_PURCHASE_AMOUNT_RANGE: `입력된 금액이 ${PAYMENT.PURCHASE_AMOUNT.MIN} 사이가 아닙니다. ${PAYMENT.PURCHASE_AMOUNT.MIN} 이상 ${PAYMENT.PURCHASE_AMOUNT.MAX} 이하의 금액을 입력해주세요.`,
};
