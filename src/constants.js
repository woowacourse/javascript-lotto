export const LOTTO = {
  UPPER: 45,
  LOWER: 1,
  COUNT: 6,
  PRICE: 1_000,
};

export const ERROR_MESSAGE = {
  PREFIX: "[ERROR]",
  EMPTY_STRING: "빈 값을 입력할 수 없습니다.",
  NOT_POSITIVE_NUMBER: "양의 정수만 입력 가능합니다.",
  OVER_UPPER: "입력된 값이 유효범위보다 큽니다.",
  UNDER_LOWER: "입력된 값이 유효범위보다 작습니다.",
  NOT_NUMBER: "숫자만 입력 가능합니다.",
  NOT_DIVIDED: "나누어 떨어져야 합니다",
  DUPLICATED: "중복된 값이 존재합니다.",
  INVALID_ARRAY_LENGTH: "유효하지 않은 개수입니다.",
  NOT_INCLUDED: "유효하지 않은 입력입니다.",

  BONUS_NUMBER_DUPLICATED: "보너스 번호가 당첨번호와 중복됩니다.",
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
