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
};

export const AMOUNT = {
  MINIMUM: 1000,
  UNIT: 1000,
};

export const LOTTO_NUMBER = {
  LENGTH: 6,
  RANGE_MIN: 1,
  RANGE_MAX: 45,
};

export const ERROR_MESSAGES = {
  INVALID_MINIMUM_AMOUNT: `금액은 ${AMOUNT.MINIMUM}원 이상으로 입력해주세요.`,
  INVALID_AMOUNT_UNIT: `${AMOUNT.UNIT}원 단위로 입력해주세요.`,
  INVALID_LOTTO_RANGE: `당첨 번호는 ${LOTTO_NUMBER.RANGE_MIN}~${LOTTO_NUMBER.RANGE_MAX} 사이의 숫자로 입력해주세요.`,
  DUPLICATED_LOTTO_NUMBER: "당첨 번호는 중복 없이 입력해주세요.",
};

export const convertCountToString = {
  3: "3개",
  4: "4개",
  5: "5개",
  bonus: "5개 + 보너스볼",
  6: "6개",
};
