export const LOTTO_SETTINGS = {
  LOTTO_NUMBER_SIZE: 6,
  BONUS_NUMBER_SIZE: 1,

  MIN_LOTTO_NUMBER: 1,
  MAX_LOTTO_NUMBER: 45,
  LOTTO_PRICE: 1000,
}

export const UI_SETTINGS = {
  DEFAULT_VISIBILITY: false,
}

export const ALERT_MESSAGES = {
  UNDER_MIN_PRICE: `최소 ${LOTTO_SETTINGS.LOTTO_PRICE}원 이상의 금액을 입력해야 합니다.`,
  NOT_INTEGER_PRICE: `구입 금액은 정수로 입력해야합니다.`,

  EMPTY_RESULT_INPUT: '당첨 번호와 보너스 번호를 입력해주세요.',
  DUPLICATED_NUMBERS_EXIST: '로또 번호에 중복이 있습니다.',
  NUMBERS_OUT_OF_RANGE: '로또 번호는 1 ~ 45 사이의 숫자여야 합니다.',
}

export const DOM_CLASSES = {
  MONEY_INPUT_CONTAINER: 'money-input-div',
  MONEY_FORM: 'money-input-form',
  MONEY_FORM_INPUT: 'money-input-form__input',
  MONEY_FORM_SUBMIT: 'money-input-form__submit',

  LOTTO_CONTAINER: 'lotto-div',
  LOTTO_SWITCH: 'lotto-div__switch',
  LOTTO_TICKET: 'lotto-div__ticket',
  LOTTO_TICKET_NUMBER: 'lotto-div__number',

  RESULT_INPUT_CONTAINER: 'result-input-div',
  RESULT_INPUT_FORM: 'result-input-form',
  RESULT_INPUT_SUBMIT: 'result-input-form__submit',
  RESULT_WINNING_NUMBER: 'result-input-form__winning-number',
  RESULT_BONUS_NUMBER: 'result-input-form__bonus-number',

  MODAL: 'modal',
  MODAL_WINNING_COUNT: 'modal__winning-count',
  MODAL_EARNING_RATE: 'modal__earning-rate',
  MODAL_CLOSE: 'modal__close',
  MODAL_RESTART_BUTTON: 'modal__restart-button',
}

export const DOM_IDS = {
  APP: 'app',
}

export const PRIZE = {
  FIRST: 2000000000,
  SECOND: 30000000,
  THIRD: 1500000,
  FOURTH: 50000,
  FIFTH: 5000,
}
