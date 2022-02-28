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
  MINIMUM_AMOUNT_IS_SMALL: `금액은 ${AMOUNT.MINIMUM}원 이상으로 입력해주세요.`,
  NOT_DIVIDED_INTO_THOUSAND: `금액은 ${AMOUNT.UNIT}원 단위로 입력해주세요.`,
};
