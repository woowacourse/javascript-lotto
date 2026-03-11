const OutputView = {
  printBuyLottoCount(buyLottoCount) {
    console.log(`${buyLottoCount}개를 구매했습니다.`);
  },

  printLottoNumbers(numbers) {
    console.log(`[${numbers.join(", ")}]`);
  },

  printLottoResult(allRankCount, profitRate) {
    console.log("당첨 통계");
    console.log("--------------------");
    console.log(`3개 일치 (5,000원) - ${allRankCount.FIFTH}개`);
    console.log(`4개 일치 (50,000원) - ${allRankCount.FOURTH}개`);
    console.log(`5개 일치 (1,500,000원) - ${allRankCount.THIRD}개`);
    console.log(
      `5개 일치, 보너스 볼 일치 (30,000,000원) - ${allRankCount.SECOND}개`,
    );
    console.log(`6개 일치 (2,000,000,000원) - ${allRankCount.FIRST}개`);
    console.log(`총 수익률은 ${profitRate}%입니다.`);
  },
};

export default OutputView;
