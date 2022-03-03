export const SELECTOR = {
  // 구매
  PURCHASE_FORM: ".purchase-form",
  PURCHASE_INPUT: ".purchase-input",
  PURCHASE_BUTTON: ".purchase-button",
  PURCHASE_INFOMATION: ".purchase-infomation",
  LOTTO_NUMBER_LIST: ".lotto-number-list",
  SWITCH_INPUT: ".switch-input",
  // 당첨 번호
  WINNING_CONTAINER: ".winning-container",
  WINNING_NUMBER_INPUT: ".winning-number-input",
  RESULT_BUTTON: ".result-button",
  BONUS_NUMBER_INPUT: ".bonus-number-input",
  // 모달
  MODAL_CONTAINER: ".modal-container",
  MODAL_TABLE_BODY: ".modal-table-body",
  MODAL_PROFIT: ".modal-profit",
  MODAL_CLOSE: ".modal-close",
  MODAL_RESTART: ".modal-restart",
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
};

export const ERROR_MESSAGES = {
  INVALID_MINIMUM_AMOUNT: `금액은 최소 ${AMOUNT.MINIMUM}원 이상으로 입력해주세요.`,
  INVALID_MAXIMUM_AMOUNT: `최대 구입 가능한 금액은 ${AMOUNT.MAXIMUM}원 입니다.`,
  INVALID_AMOUNT_UNIT: `${AMOUNT.UNIT}원 단위로 입력해주세요.`,
  INVALID_LOTTO_RANGE: `당첨 번호는 ${LOTTO_NUMBER.RANGE_MIN}~${LOTTO_NUMBER.RANGE_MAX} 사이의 숫자로 입력해주세요.`,
  DUPLICATED_LOTTO_NUMBER: "당첨 번호는 중복 없이 입력해주세요.",
};

export const MATCH_COUNT_INFO = {
  THREE: "3개",
  FOUR: "4개",
  FIVE: "5개",
  BONUS: "5개 + 보너스볼",
  SIX: "6개",
};

export const MATCH_NUMBER = {
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
};

export const BONUS = "bonus";

export const CONVERT_TO_COUNT_INFO = {
  [MATCH_NUMBER.THREE]: MATCH_COUNT_INFO.THREE,
  [MATCH_NUMBER.FOUR]: MATCH_COUNT_INFO.FOUR,
  [MATCH_NUMBER.FIVE]: MATCH_COUNT_INFO.FIVE,
  [BONUS]: MATCH_COUNT_INFO.BONUS,
  [MATCH_NUMBER.SIX]: MATCH_COUNT_INFO.SIX,
};

export const WINNER_PRICE = {
  FRIST: 2000000000,
  SECOND: 30000000,
  THIRD: 1500000,
  FOURTH: 50000,
  FIFTH: 5000,
};
