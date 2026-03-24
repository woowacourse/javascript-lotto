export const LOTTO = {
  UPPER: 45,
  LOWER: 1,
  COUNT: 6,
  PRICE: 1_000,
};

export const ERROR_MESSAGE = {
  PREFIX: "[ERROR]",
  EMPTY: "[ERROR] 값을 입력해주세요.",
  NOT_NUMBER: "[ERROR] 숫자를 입력해주세요.",
  NOT_POSITIVE: "[ERROR] 양수를 입력해주세요.",
  NOT_DIVIDED: "[ERROR] 1,000원 단위로 입력해주세요.",
  OVER_UPPER: "[ERROR] 1~45 사이의 숫자를 입력해주세요.",
  UNDER_LOWER: "[ERROR] 1~45 사이의 숫자를 입력해주세요.",
  DUPLICATED: "[ERROR] 중복되지 않는 숫자를 입력해주세요.",
  INVALID_LENGTH: "[ERROR] 6개의 숫자를 입력해주세요.",
  BONUS_DUPLICATED: "[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.",
};

export const RANK = {
  FIRST: {
    DISPLAY: "FIRST",
    MATCH_COUNT: 6,
    PRICE: 2_000_000_000,
  },
  SECOND: {
    DISPLAY: "SECOND",
    MATCH_COUNT: 5,
    PRICE: 30_000_000,
  },
  THIRD: { DISPLAY: "THIRD", MATCH_COUNT: 5, PRICE: 1_500_000 },
  FOURTH: { DISPLAY: "FOURTH", MATCH_COUNT: 4, PRICE: 50_000 },
  FIFTH: { DISPLAY: "FIFTH", MATCH_COUNT: 3, PRICE: 5_000 },
  NONE: { DISPLAY: "NONE", MATCH_COUNT: 0, PRICE: 0 },
};

export const COMMAND = {
  YES: ["Y", "y"],
  NO: ["N", "n"],
};

export const INPUT_MESSAGE = {
  MONEY: "> 구입금액을 입력해 주세요. ",
  WINNING_NUMBERS: "> 당첨 번호를 입력해 주세요. ",
  BONUS_NUMBER: "> 보너스 번호를 입력해 주세요.",
  COMMAND: "> 다시 시작하시겠습니까? (y/n) ",
};
