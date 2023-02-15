const OutputView = {
  printLottoCount(lottoCount) {
    console.log(`${lottoCount}개를 구매했습니다.`);
  },

  printPurchaseLottos(lottos) {
    const result = lottos
      .map((lotto) => `[${lotto.numbers.join(", ")}]\n`)
      .join("");

    console.log(result);
  },

  printRevenueResult(rankResult) {
    console.log("당첨 통계");
    console.log("-------------------");
    console.log(`3개 일치 (5,000원) -${rankResult[5]}개`);
    console.log(`4개 일치 (50,000원)) -${rankResult[4]}개`);
    console.log(`5개 일치 (1,500,000원) -${rankResult[3]}개`);
    console.log(
      `5개 일치, 보너스 볼 일치 (30,000,000원) -  -${rankResult[2]}개`
    );
    console.log(`6개 일치 (2,000,000,000원) -  -${rankResult[1]}개`);
  },
};

module.exports = OutputView;
