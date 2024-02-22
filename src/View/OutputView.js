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

  printWinLottos(winLottos) {
    this.printMessage("당첨 통계");
    this.printMessage("--------------------");
    this.printMessage(`3개 일치 (5,000원) - ${winLottos[5]}개`);
    this.printMessage(`4개 일치 (50,000원) - ${winLottos[4]}개`);
    this.printMessage(`5개 일치 (1,500,000원) - ${winLottos[3]}개`);
    this.printMessage(
      `5개 일치, 보너스 볼 일치 (30,000,000원) - ${winLottos[2]}개`
    );
    this.printMessage(`6개 일치 (2,000,000,000원) - ${winLottos[1]}개`);
  },

  printRateOfIncome(income) {
    this.printMessage(`총 수익률은 ${income}% 입니다.`);
  },

  printError(message) {
    this.printMessage(`❌${message}`);
  },

  printMessage(message) {
    console.log(message);
  },
};

export default OutputView;
