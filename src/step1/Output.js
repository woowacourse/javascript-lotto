export const Output = {
  printPurchaseLottoCount(purchaseCount) {
    console.log(`\n${purchaseCount}개를 구매했습니다.\n`);
  },

  printLottos(lottos) {
    lottos.forEach(lotto => {
      console.log('[' + lotto.getLottoNumber().join(', ') + ']');
    });
    console.log();
  },

  printResult(matchResultSummaries, rateOfReturn) {
    console.log();
    console.log('당첨 통계');
    console.log('--------------------');
    matchResultSummaries.forEach((summary) => {
      console.log(`${summary.label} (${summary.prize}원) - ${summary.result}개`);
    })
    console.log(`총 수익률은 ${rateOfReturn}%입니다.`);
    console.log();
  },
}
