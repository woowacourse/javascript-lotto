export const INPUT_MESSAGE = Object.freeze({
  BUDGET: "구입 금액을 입력해 주세요.",
  WINNING_LOTTO_NUMBERS: "당첨 번호를 입력해 주세요.",
  WINNING_BONUS_NUMBER: "보너스 번호를 입력해 주세요.",
  RETRY: "다시 시작하시겠습니까? (y/n) ",
});

export const PRIZE = {
  1: "6개 일치 (2,000,000,000원)",
  2: "5개 일치, 보너스 볼 일치 (30,000,000원)",
  3: "5개 일치 (1,500,000원)",
  4: "4개 일치 (50,000원)",
  5: "3개 일치 (5,000원)",
};

export const OUTPUT_MESSAGE = Object.freeze({
  RESULT_TITLE: "\n당첨 통계\n--------------------",

  formatLottoCount(lottoCount) {
    return `${lottoCount}개를 구매했습니다.`;
  },
  formatLottoArrayToString(lottoArray) {
    return lottoArray.map((numbers) => `[${numbers.join(", ")}]`).join("\n");
  },
  formatMatchingResultToString(matchingResult) {
    return matchingResult.map((result, i) => result[i].normalNumbers);
  },

  formatResults(matchedLotto) {
    return Object.keys(matchedLotto)
      .sort((a, b) => b - a)
      .map((key) => {
        return `${PRIZE[key]} - ${matchedLotto[key]}개`;
      });
  },
  formatProfit(profit) {
    return `총 수익률은 ${profit}%입니다.\n`;
  },
});
