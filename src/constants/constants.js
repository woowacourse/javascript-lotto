export const PURCHASE_AMOUNT_ERROR_MESSAGES = Object.freeze({
  NOT_A_NUMBER: "구입 금액은 숫자여야 합니다.",
  BELOW_MINIMUM: "구입 금액은 1,000원 이상이어야 합니다.",
  INVALID_UNIT: "구입 금액은 1,000원 단위여야 합니다.",
  ABOVE_MAXIMUM: "구입 금액은 100,000원 이하여야 합니다.",
});

export const WINNING_NUMBERS_ERROR_MESSAGES = Object.freeze({
  INVALID_COUNT: "당첨 번호는 6개여야 합니다.",
  NOT_A_NUMBER: "당첨 번호는 숫자여야 합니다.",
  NOT_AN_INTEGER: "당첨 번호는 정수여야 합니다.",
  OUT_OF_RANGE: "당첨 번호의 범위는 1 이상 45 이하여야 합니다.",
  DUPLICATE_NUMBER: "당첨 번호는 중복될 수 없습니다.",
});

export const BONUS_NUMBER_ERROR_MESSAGES = Object.freeze({
  NOT_A_NUMBER: "보너스 번호는 숫자여야 합니다.",
  NOT_AN_INTEGER: "보너스 번호는 정수여야 합니다.",
  OUT_OF_RANGE: "보너스 번호의 범위는 1 이상 45 이하여야 합니다.",
  DUPLICATE_NUMBER: "보너스 번호는 당첨 번호와 중복될 수 없습니다.",
});

export const RESTART_ERROR_MESSAGE = "Y, y, N, n 중 하나를 입력해야 합니다.";
