export const INPUT_MESSAGE = Object.freeze({
  purchaseAmount: "> 구입금액을 입력해 주세요.",
  winningNumbers: "> 당첨 번호를 입력해 주세요.",
  bonusNumber: "> 보너스 번호를 입력해 주세요.",
});

export const OUTPUT_MESSAGE = Object.freeze({
  purchaseCount: "개를 구매했습니다.",
  winningStatistics: "당첨 통계\n--------------------",
  winningStatisticsResult(correctCount, prize, winningCount) {
    return `${correctCount}개 일치 (${prize.toLocaleString()}원) - ${winningCount}개`;
  },
  winningStatisticsBonusResult(correctCount, prize, winningCount) {
    return `${correctCount}개 일치, 보너스 볼 일치 (${prize.toLocaleString()}원) - ${winningCount}개`;
  },
  totalProfitRate(rate) {
    return `총 수익률은 ${rate}%입니다.`;
  },
});
