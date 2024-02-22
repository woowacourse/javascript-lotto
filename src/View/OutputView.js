const OutputView = {
  printBoughtLottos(boughtLottos) {
    this.printLottoLength(boughtLottos.length);
    boughtLottos.forEach((lotto) =>
      this.printMessage(`[${lotto.getLottoNumbers().join(", ")}]`)
    );
  },

  printLottoLength(lottoCount) {
    this.printMessage(`${lottoCount}개를 구매했습니다.`);
  },

  printMessage(message) {
    console.log(message);
  },
};

export default OutputView;
