const Output = {
  printErrorMessage(errorMessage) {
    console.log(`[ERROR] ${errorMessage}\n`);
  },

  printIssuedLottos(purchaseAmount, lottos) {
    const lottoCount = purchaseAmount / 1_000;
    console.log(`${lottoCount}개를 구매했습니다.`);
    lottos.forEach((lotto) => console.log(`[${lotto.join(", ")}]`));
  },

  printStatistics(statistics) {
    console.log("\n당첨 통계\n--------------------");
    console.log(`3개 일치 (5,000원) - ${statistics.get(3)}개`);
    console.log(`4개 일치 (50,000원) - ${statistics.get(4)}개`);
    console.log(`5개 일치 (1,500,000원) - ${statistics.get(5)}개`);
    console.log(
      `5개 일치, 보너스 볼 일치 (30,000,000원) - ${statistics.get(5.5)}개`,
    );
    console.log(`6개 일치 (2,000,000,000원) - ${statistics.get(6)}개`);
  },
};

export default Output;
