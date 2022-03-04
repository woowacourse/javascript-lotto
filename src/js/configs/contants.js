export const DOM_STRING = {
  APP: 'app',
  BLIND: 'blind',
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
  BONUS_NUMBER_INPUT: 'bonus-number-input',
  SWITCH_LABEL: 'switch-label',
  TICKET_EMOJI: 'ticket-emoji',
};

export const SELECTOR = {
  APP: `#${DOM_STRING.APP}`,
  TITLE: `#${DOM_STRING.TITLE}`,
  PAYMENT_SECTION: `#${DOM_STRING.PAYMENT_SECTION}`,
  TICKET_SECTION: `#${DOM_STRING.TICKET_SECTION}`,
  WINNING_NUMBER_SECTION: `#${DOM_STRING.WINNING_NUMBER_SECTION}`,
  PAYMENT_INPUT: `#${DOM_STRING.PAYMENT_INPUT}`,
  PAYMENT_SUBMIT: `#${DOM_STRING.PAYMENT_SUBMIT}`,
  SWITCH: `.${DOM_STRING.SWITCH}`,
  SLIDER: `#${DOM_STRING.SLIDER}`,
  TICKET_LIST_WRAP: `#${DOM_STRING.TICKET_LIST_WRAP}`,
  TICKET_LIST: `#${DOM_STRING.TICKET_LIST}`,
  TICKET_LIST_COLUMN: `.${DOM_STRING.TICKET_LIST_COLUMN}`,
  TICKET_LIST_ROW: `.${DOM_STRING.TICKET_LIST_ROW}`,
  TICKET: `.${DOM_STRING.TICKET}`,
  TICKET_NUMBERS: `.${DOM_STRING.TICKET_NUMBERS}`,
  SHOW_NUMBER_TOGGLE_AREA: `#${DOM_STRING.SHOW_NUMBER_TOGGLE_AREA}`,
  WINNING_NUMBER_FIELDSET: `#${DOM_STRING.WINNING_NUMBER_FIELDSET}`,
  WINNING_NUMBER_FORM: `#${DOM_STRING.WINNING_NUMBER_FORM}`,
  WINNING_NUMBER_INPUT_WRAP: `#${DOM_STRING.WINNING_NUMBER_INPUT_WRAP}`,
  WINNING_NUMBER_INPUT: `.${DOM_STRING.WINNING_NUMBER_INPUT}`,
  SHOW_RESULT_BUTTON: `#${DOM_STRING.SHOW_RESULT_BUTTON}`,
  BONUS_NUMBER_FORM: `#${DOM_STRING.BONUS_NUMBER_FORM}`,
  BONUS_NUMBER_INPUT: `.${DOM_STRING.BONUS_NUMBER_INPUT}`,
  SWITCH_LABEL: `.${DOM_STRING.SWITCH_LABEL}`,
  TICKET_EMOJI: `.${DOM_STRING.TICKET_EMOJI}`,
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
    MAX: 100000,
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

export const WINNINGS = {
  under: 0,
  three: 5000,
  four: 50000,
  five: 1500000,
  fiveBonus: 30000000,
  six: 2000000000,
};
