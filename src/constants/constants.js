export const YES = "y";
export const NO = "n";
export const UPPER_YES = YES.toUpperCase();
export const UPPER_NO = NO.toUpperCase();

export const MIN_UNIT = 1_000;
export const MAX_AMOUNT = 100_000;

export const MIN_LOTTO_NUMBER = 1;
export const MAX_LOTTO_NUMBER = 45;
export const LOTTO_LENGTH = 6;

export const MATCH_KEY = Object.freeze({
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  FIVE_AND_BONUS: 5.5,
  SIX: 6,
});

export const MATCH_PRIZE = Object.freeze({
  THREE: 5_000,
  FOUR: 50_000,
  FIVE: 1_500_000,
  FIVE_AND_BONUS: 30_000_000,
  SIX: 2_000_000_000,
});

export const PURCHASE_AMOUNT_ERROR_MESSAGES = Object.freeze({
  NOT_A_NUMBER: "구입 금액은 숫자여야 합니다.",
  BELOW_MINIMUM: `구입 금액은 ${MIN_UNIT.toLocaleString()}원 이상이어야 합니다.`,
  INVALID_UNIT: `구입 금액은 ${MIN_UNIT.toLocaleString()}원 단위여야 합니다.`,
  ABOVE_MAXIMUM: `구입 금액은 ${MAX_AMOUNT.toLocaleString()}원 이하여야 합니다.`,
});

export const WINNING_NUMBERS_ERROR_MESSAGES = Object.freeze({
  INVALID_COUNT: `당첨 번호는 ${LOTTO_LENGTH}개여야 합니다.`,
  NOT_A_NUMBER: "당첨 번호는 숫자여야 합니다.",
  NOT_AN_INTEGER: "당첨 번호는 정수여야 합니다.",
  OUT_OF_RANGE: `당첨 번호의 범위는 ${MIN_LOTTO_NUMBER} 이상 ${MAX_LOTTO_NUMBER} 이하여야 합니다.`,
  DUPLICATE_NUMBER: "당첨 번호는 중복될 수 없습니다.",
});

export const BONUS_NUMBER_ERROR_MESSAGES = Object.freeze({
  NOT_A_NUMBER: "보너스 번호는 숫자여야 합니다.",
  NOT_AN_INTEGER: "보너스 번호는 정수여야 합니다.",
  OUT_OF_RANGE: `보너스 번호의 범위는 ${MIN_LOTTO_NUMBER} 이상 ${MAX_LOTTO_NUMBER} 이하여야 합니다.`,
  DUPLICATE_NUMBER: "보너스 번호는 당첨 번호와 중복될 수 없습니다.",
});

export const RESTART_ERROR_MESSAGE = `${UPPER_YES}, ${YES}, ${UPPER_NO}, ${NO} 중 하나를 입력해야 합니다.`;
