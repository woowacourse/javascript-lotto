export const INPUT_MESSAGE = Object.freeze({
  WINNING_LOTTO_NUMBERS:
    "지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.",
  WINNING_NUMBERS: "당첨 번호",
  BONUS_NUMBER: "보너스 번호",
});

export const SYMBOL = {
  LOTTO_EMOJI: "🎟️",
  LOTTO_NUMBER_DELIMITER: ", ",
};

export const PRIZE_STR = {
  1: {
    MATCH_COUNT: "6개",
    PRIZE_MONEY: "2,000,000,000,000원",
  },
  2: {
    MATCH_COUNT: "5개+보너스볼",
    PRIZE_MONEY: "30,000,000원",
  },
  3: {
    MATCH_COUNT: "5개",
    PRIZE_MONEY: "1,500,000원",
  },
  4: {
    MATCH_COUNT: "4개",
    PRIZE_MONEY: "50,000원",
  },
  5: {
    MATCH_COUNT: "3개",
    PRIZE_MONEY: "5,000원",
  },
};

export const OUTPUT_MESSAGE = Object.freeze({
  RESULT_BTN: "결과 확인하기",
  MATCH_COUNT: "일치 갯수",
  PRIZE_MONEY: "당첨금",
  COUNT: "당첨 갯수",
  RESULT_TITLE: "🏆 당첨 통계 🏆",
  RETRY: "다시 시작하기",
  CLOSE: "X",

  formatLottoCount(lottoCount) {
    return `총 ${lottoCount}개를 구매했습니다.`;
  },

  formatResultsTable(rankData) {
    return Object.entries(rankData).map(([rank, count]) => ({
      matchCount: PRIZE_STR[rank].MATCH_COUNT,
      prize: PRIZE_STR[rank].PRIZE_MONEY,
      count: `${count}개`,
    }));
  },

  formatProfits(profits) {
    return `당신의 총 수익률은 ${profits}%입니다.\n`;
  },
});
