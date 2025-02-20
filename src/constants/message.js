export const INPUT = Object.freeze({
  PRICE: "> 구입금액을 입력해주세요.",
  WINNER_NUMBERS: `\n> 당첨 번호를 입력해 주세요.`,
  BONUS_NUMBER: `\n> 보너스 번호를 입력해주세요.`,
  RETRY: "> 다시 시작하시겠습니까? (y/n)",
});

export const OUTPUT = Object.freeze({
  BUY_COUNT: "개를 구매했습니다.",
  WINNING_HISTORY: `\n당첨통계`,
  LINE: "--------------------",
});

export const ERROR_PREFIX = "[ERROR]";

export const ERROR = Object.freeze({
  EMPTY: "빈 값은 입력할 수 없습니다.",
  NOT_NUMBER: "숫자가 아닌 값은 입력할 수 없습니다.",
  INVALID_RANGE: "범위를 벗어난 입력은 할 수 없습니다.",
  INCLUDE: "보너스 번호는 로또 번호와 중복될 수 없습니다.",
  UNIT: "구입 금액은 1000원 단위로 입력해야 합니다.",
  INVALID_RETRY_STRING: "y 또는 n을 입력해주세요.",
  LENGTH: "로또 번호는 6개여야 합니다.",
  DUPLICATE: "중복된 숫자가 있습니다.",
});

export const RETRY_STRING = Object.freeze(["y", "Y", "n", "N"]);
