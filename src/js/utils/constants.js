export const AMOUNT = {
  MINIMUM: 1000,
  UNIT: 1000,
};

export const LOTTO_NUMBER = {
  LENGTH_MIN: 0,
  LENGTH_MAX: 6,
  RANGE_MIN: 1,
  RANGE_MAX: 45,
};

export const ERROR_MESSAGES = {
  MINIMUM_AMOUNT_IS_SMALL: `금액은 ${AMOUNT.MINIMUM}원 이상으로 입력해 주세요.`,
  NOT_DIVIDED_INTO_THOUSAND: `금액은 ${AMOUNT.UNIT}원 단위로 입력해 주세요.`,
  NOT_A_NUMBER: "당첨 번호는 숫자만 입력해 주세요.",
  EMPTY_CAN_NOT_ENTERED: "당첨 번호를 전부 다 입력해 주세요",
  OUT_OF_RANGE: `당첨 번호는 ${LOTTO_NUMBER.RANGE_MIN}~${LOTTO_NUMBER.RANGE_MAX} 범위 안으로 입력해 주세요`,
  CAN_NOT_OVERLAP: "당첨 번호는 중복없이 입력해 주세요",
};
