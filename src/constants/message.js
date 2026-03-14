export const ERROR_MESSAGE = Object.freeze({
  INVALID_POSITIVE_INTEGER: "[ERROR] 입력값은 양의 정수여야합니다.",
  INVALID_PURCHASE_UNIT: "[ERROR] 구입 금액은 1,000원 단위여야 합니다.",
  INVALID_LOTTO_NUM_RANGE: "[ERROR] 로또 번호는 1-45 범위여야합니다.",
  DUPLICATE_LOTTO_NUMBERS: "[ERROR] 로또 번호에 중복된 숫자가 있습니다.",
  BONUS_IN_WINNING_NUMBERS:
    "[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.",
  INVALID_LOTTO_COUNT: "[ERROR] 로또 번호는 6개여야 합니다.",
  INVALID_RESTART_ANSWER: "[ERROR] 대답은 y/n로 답해야 합니다.",
  NOT_NUMBER: "[ERROR] 정수로 입력해주세요.",
});

export const WEB_ERROR_MESSAGE = Object.freeze({
  INVALID_PURCHASE_UNIT: "구입 금액은 1,000원 단위여야 합니다.", 
  INVALID_LOTTO_NUM_RANGE: "번호는 1부터 45사이 숫자로 입력해주세요.", 
  DUPLICATE_LOTTO_NUMBERS: "로또 번호에 중복된 숫자가 있습니다.", 
  BONUS_IN_WINNING_NUMBERS:
    "보너스 번호는 당첨 번호와 중복될 수 없습니다.",
  INVALID_LOTTO_COUNT: "로또 번호는 총 6개가 입력되어야 합니다.", 
  NOT_NUMBER: "정확한 숫자를 입력해주세요.", 
});

