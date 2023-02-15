const OutputView = {
  printLottoCount(lottoCount) {
    console.log(`${lottoCount}개를 구매했습니다.`);
  },

  printPurchaseLottos(lottos) {
    const result = lottos.map((lotto) => `${lotto.numbers}\n`).join("");

    console.log(result);
  },
};

module.exports = OutputView;
