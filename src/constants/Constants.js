const StaticValue = Object.freeze({
  PURCHASE_AMOUNT_UNIT: 1000,
  REGEX_NON_DIGIT: /\D|^$/,
  MATCH_FIVE_AND_BONUS: 5.5,
});

const MatchCount = Object.freeze({
  6: "SIX",
  5.5: "FIVE_AND_BONUS",
  5: "FIVE",
  4: "FOUR",
  3: "THREE",
  2: "TWO",
  1: "ONE",
  0: "ZERO",
});

const Rank = Object.freeze({
  SIX: 1,
  FIVE_AND_BONUS: 2,
  FIVE: 3,
  FOUR: 4,
  THREE: 5,
  TWO: 6,
  ONE: 6,
  ZERO: 6,
});

const Prize = Object.freeze({
  1: 2_000_000_000,
  2: 30_000_000,
  3: 1_500_000,
  4: 50_000,
  5: 5000,
  6: 0,
});

const ConsoleMessage = Object.freeze({
  PURCHASE_AMOUNT: "구입금액을 입력해 주세요. ",
  purchaseCount: (count) => `${count}개를 구매했습니다.`,
  WINNING_NUMBER: "당첨 번호를 입력해 주세요. ",
  BONUS_NUMBER: "보너스 번호를 입력해 주세요. ",
  RESULT: `당첨 통계
--------------------`,
  rankResult: (ranks) => {
    return [
      `3개 일치 (5,000원) - ${ranks[5]}개`,
      `4개 일치 (50,000원) - ${ranks[4]}개`,
      `5개 일치 (1,500,000원) - ${ranks[3] || 0}개`,
      `5개 일치, 보너스 볼 일치 (30,000,000원) - ${ranks[2]}개`,
      `6개 일치 (2,000,000,000원) - ${ranks[1]}개`,
    ];
  },
  profitRateResult: (profitRate) => `총 수익률은 ${profitRate} %입니다.`,
  RESTART: "다시 시작하시겠습니까? (y/n) ",
});

const ErrorMessage = Object.freeze({
  MONEY_VALUE: "[ERROR] 로또 구입 금액은 1000원 단위로 입력해 주세요.",
  MINMUM_VALUE: "[ERROR] 로또 구입 금액은 1000원 이상이여야 합니다.",
  MONEY_INPUT_TYPE: "[ERROR] 로또 구입 금액은 숫자만 입력해 주세요.",
  LOTTO_VALUE: "[ERROR] 로또 번호는 1~45 사이의 숫자를 입력해주세요.",
  LOTTO_LENGTH: "[ERROR] 로또 당첨 번호 6개를 입력해주세요.",
  LOTTO_DUPLICATE: "[ERROR] 로또 번호는 중복되지 않게 입력해주세요.",
  BONUS_NUMBER_DUPLICATE:
    "[ERROR] 보너스 번호는 로또 번호와 중복되지 않게 입력해주세요.",
  BONUS_NUMBER_VALUE: "[ERROR] 보너스 번호는 1~45 사이의 숫자를 입력해주세요.",
  RESTART: "[ERROR] y 또는 n을 입력해주세요.",
});

export { StaticValue, MatchCount, Rank, Prize, ConsoleMessage, ErrorMessage };
