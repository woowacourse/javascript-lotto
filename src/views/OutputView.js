const OutputView = {
  printPurchaseLottos: function (purchaseLottos) {
    console.log(`${purchaseLottos.length}개를 구입했습니다.`);
    purchaseLottos.forEach((purchaseLotto) => {
      console.log(`[${purchaseLotto.numbers.join(", ")}]`);
    });
  },
};

export default OutputView;
