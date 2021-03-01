export const ALERT_MESSAGE = {
  INVALID_MONEY_INPUT: '최소 1,000원 이상의 금액을 입력하세요.',
  INVALID_WINNING_NUMBER_INPUT: '1 ~ 45 사이의 숫자를 중복되지 않게 입력해주세요',
  INVALID_LOTTO_NUMBER_INPUT: '1 ~ 45 사이의 숫자를 중복되지 않게 입력해주세요',
};

export const LOTTO = {
  MINIMUM_NUMBER: 1,
  MAXIMUM_NUMBER: 45,
  NUMBER_COUNT: 6,
  PRICE: 1000,
};

export const VALUE = {
  WINNING_PRICE: {
    FIRST: 2000000000,
    SECOND: 30000000,
    THIRD: 1500000,
    FOURTH: 50000,
    FIFTH: 5000,
    LOSE: 0,
  },
  MATCHED_COUNT: {
    ZERO: 0,
    ONE: 1,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6
  },
  RANK: {
    FIRST: 1,
    SECOND: 2,
    THIRD: 3,
    FOURTH: 4,
    FIFTH: 5,
    LOSE: 6
  }
};

export const SELECTORS = {
  MONEY_INPUT: {
    FORM: '#money-input-form',
    INPUT: '#money-input',
    SUBMIT_BUTTON: '#money-submit-button',
  },

  LOTTO_NUMBERS_INPUT: {
    SECTION: '.lotto-numbers-input-section',
    FORM: '#lotto-numbers-input-form',
    LOTTO_COUNT_TEXT: '.lotto-count',
    INPUT: '.lotto-number',
    SUBMIT_BUTTON: '#lotto-numbers-input-button',
    AUTO_BUTTON: '#lotto-numbers-auto-button',
  },

  LOTTO_LIST: {
    SECTION: '.lotto-list-section',
    CONTAINER: '.lotto-list-container',
    ELEMENT: '.lotto-list',
    LOTTO_COUNT_TEXT: '.purchased-lotto-count',
    LOTTO_NUMBERS_TEXT: '.lotto-numbers',
    LOTTO_NUMBERS_TOGGLE_BUTTON: '.lotto-numbers-toggle-button',
  },

  WINNING_NUMBER_INPUT: {
    SECTION: '.winning-number-form-section',
    FORM: '#winning-number-form',
    INPUT: '.winning-number',
    FIRST_INPUT: '#first-winning-number'
  },

  BONUS_NUMBER_INPUT: {
    INPUT: '.bonus-number',
  },

  MODAL: {
    CONTAINER: '.modal',
    CANCEL: '.modal-close',
    RESTART_BUTTON: '.restart-button',
    WINNING_COUNT_TEXT: '.winning-count',
    WINNING_RATE_TEXT: '.winning-rate',
  }
}