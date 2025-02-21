class OutputView {
  static printMessage(content) {
    console.log(content);
  }

  static printBlank() {
    console.log();
  }

  static printWinning(winning, earningRate) {
    OutputView.printBlank();
    this.printMessage("당첨 통계");
    this.printMessage("--------------------");
    this.printMessage(`3개 일치 (5,000원) - ${winning["5"]}개`);
    this.printMessage(`4개 일치 (50,000원) - ${winning["4"]}개`);
    this.printMessage(`5개 일치 (1,500,000원) - ${winning["3"]}개`);
    this.printMessage(
      `5개 일치, 보너스 볼 일치 (30,000,000원) - ${winning["2"]}개`,
    );
    this.printMessage(`6개 일치 (2,000,000,000원) - ${winning["1"]}개`);
    this.printMessage(`총 수익률은 ${earningRate}%입니다.`);
  }
}

export default OutputView;
