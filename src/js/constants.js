export const ACTION = {
  PURCHASE_LOTTO: 'purchase-lotto',
  TOGGLE_LOTTO_LIST: 'toggle-lotto-list',
  SET_WINNING_NUMBERS: 'set-winning-numbers',
  TOGGLE_STATISTICS_MODAL: 'toggle-statistics-modal',
  RESET: 'reset',
};

export const ERROR_MESSAGE = {
  EMPTY_MONEY: '금액을 입력해 주세요!',
  NOT_INTEGER_MONEY: '정수만 입력해 주세요!',
  UNDER_MIN_MONEY: '천원 이상 입력해 주세요!',
  NOT_DIVIDED_BY_THOUSAND: '천 단위로 입력해 주세요!',

  EMPTY_WINNING_NUMBERS: '모든 당첨 번호를 입력해 주세요!',
  NOT_INTEGER_WINNING_NUMBER: '정수만 입력해 주세요!',
  INVALID_WINNING_NUMBER_RANGE: '모든 값을 1 ~ 45 사이로 입력해 주세요!',
  DUPLICATE_WINNING_NUMBERS: '서로 다른 당첨 번호를 입력해 주세요!',
};

export const LOTTO = {
  RANGE: {
    MIN: 1,
    MAX: 45,
  },
  COUNT: 6,
  PRICE: 1000,
  PRIZE_MONEY: [0, 2000000000, 30000000, 1500000, 50000, 5000],
};

export const WINNING_NUM_PLACEHOLDER = '';

export const INITIAL_STATE = {
  money: 0,
  lottoList: [],
  lottoListVisibility: false,
  winningNumbers: {
    normal: Array(6).fill(WINNING_NUM_PLACEHOLDER),
    bonus: WINNING_NUM_PLACEHOLDER,
  },
  statisticsModalVisibility: false,
};

export const VALIDATION_ERROR_NAME = 'ValidationError';

export const DUPLICATE_ERROR_CLASS_NAMES = [
  'duplicate-error-1',
  'duplicate-error-2',
  'duplicate-error-3',
];
export const INVALID_RANGE_ERROR_CLASS_NAME = 'invalid-range-error';
