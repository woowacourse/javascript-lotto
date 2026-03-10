export const ERROR_MESSAGE = {
  COMMON: {
    INVALID_NUMBER: "[ERROR] 숫자 형식이 올바르지 않습니다.",
  },
  LOTTO: {
    INVALID_NUMBER: "[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.",
    INVALID_LENGTH: "[ERROR] 로또 번호는 6개여야 합니다.",
    DUPLICATE: "[ERROR] 로또 번호는 중복될 수 없습니다.",
  },
  PURCHASE: {
    INVALID_UNIT: "[ERROR] 구입 금액은 1,000원 단위여야 합니다.",
    TOO_LARGE: "[ERROR] 구입 금액이 너무 큽니다.",
  },
  BONUS: {
    DUPLICATE: "[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.",
  },
  RETRY: {
    INVALID_RETRY: "[ERROR] 다시 시작 여부는 'y' 또는 'n'으로 입력해야 합니다.",
  },
};

export const INPUT_MESSAGE = {
  RETRY: "\n> 다시 시작하시겠습니까? (y/n) ",
  PURCHASE_MONEY: "\n> 구입금액을 입력해 주세요. ",
  WINNING_LOTTO: "\n> 당첨 번호를 입력해 주세요. ",
  BONUS_NUMBER: "\n> 보너스 번호를 입력해 주세요. ",
};

export const OUTPUT_MESSAGE = {
  PURCHASE_COUNT: (count) => `${count}개를 구매했습니다.`,
  LOTTO_NUMBERS: (numbers) => `[${numbers.join(", ")}]`,

  WINNING_STATISTICS_HEADER: "\n당첨 통계\n--------------------",
  WINNING_MATCH_COUNT_INFO: (matchCount) => `${matchCount}개 일치`,
  IS_BONUS_NUMBER_MATCH: `, 보너스 볼 일치`,
  WINNING_PRIZE_MONEY: (money) => `(${money}원)`,
  PROFIT_RATE: (profitRate) => `총 수익률은 ${profitRate}%입니다.`,
};
