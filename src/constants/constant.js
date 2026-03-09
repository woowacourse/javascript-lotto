export const PRIZE = {
  FIRST: 2_000_000_000,
  SECOND: 30_000_000,
  THIRD: 1_500_000,
  FOURTH: 50_000,
  FIFTH: 5_000,
};

export const MONEY_UNIT = 1000;

export const LOTTO_RANGE = {
  MAX: 45,
  MIN: 1,
  COUNT: 6,
};

export const ERROR_MESSAGE = {
  PURCHASE_MONEY: {
    NONE: "[ERROR] 구입 금액을 입력해주세요.",
    MIN: "[ERROR] 구입 금액은 1000원 이상입니다.",
    NUMBER: "[ERROR] 구입 금액은 숫자만 입력해야 합니다.",
    UNIT: "[ERROR] 구입 금액은 1000원 단위입니다.",
  },
  WINNING_NUMBER: {
    LENGTH: "[ERROR] 당첨 번호는 6개이어야 합니다.",
    COMMA: "[ERROR] 콤마(,) 사이에 숫자를 입력해야 합니다.",
    RANGE: "[ERROR] 당첨 번호는 1 ~ 45 사이어야 합니다.",
    REGEX: "[ERROR] 당첨 번호 구분은 콤마(,) 입니다.",
    DUPLICATE: "[ERROR] 당첨 번호가 중복입니다.",
  },
  BONUS_NUMBER: {
    RANGE: "[ERROR] 보너스 번호는 1 ~ 45 사이어야 합니다.",
    NUMBER: "[ERROR] 숫자를 입력해야 합니다.",
    DUPLICATE: "[ERROR] 당첨 번호랑 중복입니다.",
  },
  RETRY: {
    INVALID: "[ERROR] 다시 입력해주세요.",
  },
};

export const RETRY_ANSWER = {
  YES: ["y", "Y"],
  NO: ["n", "N"],
};
