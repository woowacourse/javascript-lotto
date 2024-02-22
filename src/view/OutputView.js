class OutputView {
  static printBoughtLottos(lottoNumbersArray) {
    this.#printMessage(`${lottoNumbersArray.length}개를 구매했습니다.`);
    lottoNumbersArray.forEach((lottoNumbers) =>
      this.#printMessage(this.formatArrayString(lottoNumbers))
    );
  }

  static formatArrayString(array) {
    return `[${array.join(", ")}]`;
  }

  static printBlankLine() {
    this.#printMessage();
  }

  static printLottoResult(rankResult, profitRate) {
    this.printBlankLine();
    this.#printMessage("당첨 통계");
    this.#printMessage("--------------------");
    this.#printMessage(`3개 일치 (5,000원) - ${rankResult.fifth}개
4개 일치 (50,000원) - ${rankResult.fourth}개
5개 일치 (1,500,000원) - ${rankResult.third}개
5개 일치, 보너스 볼 일치 (30,000,000원) - ${rankResult.second}개
6개 일치 (2,000,000,000원) - ${rankResult.first}개
총 수익률은 ${profitRate.toFixed(1)}%입니다.`);
  }

  static #printMessage(...args) {
    console.log(...args);
  }
}

export default OutputView;
