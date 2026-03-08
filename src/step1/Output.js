export const Output = {
  printPurchaseLottoCount(purchaseCount) {
    console.log(`\n${purchaseCount}개를 구매했습니다.\n`);
  },

  printLottos(lottos) {
    lottos.forEach((lotto) => {
      console.log("[" + lotto.getLottoNumber().join(", ") + "]");
    });
    console.log();
  },

  printResult(matchResult, rateOfReturn) {
    console.log("\n당첨 통계");
    console.log("--------------------");
    console.log(`3개 일치 (5,000원) - ${matchResult.get(5)}개`);
    console.log(`4개 일치 (50,000원) - ${matchResult.get(4)}개`);
    console.log(`5개 일치 (1,500,000원) - ${matchResult.get(3)}개`);
    console.log(
      `5개 일치, 보너스 볼 일치 (30,000,000원) - ${matchResult.get(2)}개`,
    );
    console.log(`6개 일치 (2,000,000,000원) - ${matchResult.get(1)}개`);
    console.log(`총 수익률은 ${rateOfReturn}%입니다.\n`);
  },
};
