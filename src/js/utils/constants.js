export const SELECTOR = {
  PURCHASE_FORM: ".purchase-form",
  PURCHASE_INPUT: ".purchase-input",
  PURCHASE_BUTTON: ".purchase-button",
  PURCHASE_INFOMATION: ".purchase-infomation",
  LOTTO_NUMBER_LIST: ".lotto-number-list",
  SWITCH_INPUT: ".switch-input",
  WINNING_CONTAINER: ".winning-container",
  WINNING_NUMBER_INPUT: ".winning-number-input",
  RESULT_BUTTON: ".result-button",
  BONUS_NUMBER_INPUT: ".bonus-number-input",
  MODAL_CONTAINER: ".modal-container",
  MODAL_PROFIT: ".modal-profit",
  MODAL_CLOSE: ".modal-close",
  MODAL_RESTART: ".modal-restart",
  WINNING_COUNT: ".winning-count",
  WINNING_BONUS_COUNT: ".winning-bonus-count",
};

export const AMOUNT = {
  MINIMUM: 1000,
  MAXIMUM: 100000,
  UNIT: 1000,
};

export const LOTTO_NUMBER = {
  LENGTH: 6,
  RANGE_MIN: 1,
  RANGE_MAX: 45,
  DIGIT_MAX: 2,
};

export const ERROR_MESSAGES = {
  INVALID_MINIMUM_AMOUNT: `금액은 최소 ${AMOUNT.MINIMUM}원 이상으로 입력해주세요.`,
  INVALID_MAXIMUM_AMOUNT: `최대 구입 가능한 금액은 ${AMOUNT.MAXIMUM}원 입니다.`,
  INVALID_AMOUNT_UNIT: `구입 금액은 ${AMOUNT.UNIT}원 단위로 입력해주세요.`,
  INVALID_LOTTO_RANGE: `당첨 번호는 ${LOTTO_NUMBER.RANGE_MIN}~${LOTTO_NUMBER.RANGE_MAX} 사이의 숫자로 입력해주세요.`,
  DUPLICATED_LOTTO_NUMBER: "당첨 번호는 중복 없이 입력해주세요.",
};

export const BONUS = "bonus";

export const REWARD = {
  3: 5000,
  4: 50000,
  5: 1500000,
  6: 2000000000,
  [BONUS]: 30000000,
};
