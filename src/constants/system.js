export const PRIZE = {
  5: { reward: 5_000, matchCount: 3, bonus: false },
  4: { reward: 50_000, matchCount: 4, bonus: false },
  3: { reward: 1_500_000, matchCount: 5, bonus: false },
  2: { reward: 30_000_000, matchCount: 5, bonus: true },
  1: { reward: 2_000_000_000, matchCount: 6, bonus: false },
};

export const INPUT_MESSAGE = {
  PURCHASE_AMOUNT: "> 구입금액을 입력해 주세요. ",
  WINNING_LOTTO: "\n> 당첨 번호를 입력해 주세요. ",
  BONUS_NUMBER: "\n> 보너스 볼을 입력해 주세요. ",
  RESTART_GAME: "\n> 다시 시작하시겠습니까? (y/n) ",
};

export const OUTPUT_MESSAGE = {
  PURCHASE_NUMBER: (purchaseAmount) =>
    `${purchaseAmount / 1000}개를 구매했습니다.`,
  RESULT_HEADER: "\n당첨 통계\n--------------------",
  RESULT: (rank, key) =>
    `${PRIZE[key].matchCount}개 일치${
      PRIZE[key].bonus ? ", 보너스 볼 일치 " : " "
    }(${PRIZE[key].reward.toLocaleString()}원) - ${rank[key]}개`,
  PROFIT: (profit) => `총 수익률은 ${profit.toLocaleString()}%입니다.`,
};

export const RETRY_INPUT = "y";

export const LOTTO_PRICE = 1_000;

export const WEB_MESSAGE = {
  PURCHASE_AMOUNT: (purchaseAmount) =>
    `총 ${purchaseAmount / LOTTO_PRICE}개를 구매했습니다.`,
  LOTTO_ICON: "🎟️",
  WIN_COUNT: (count) => `${count}개`,
  PROFIT: (profit) => `당신의 총 수익률은 ${profit.toLocaleString()}%입니다.`,
};
