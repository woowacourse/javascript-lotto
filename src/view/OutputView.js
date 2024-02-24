import MESSAGES, { outputMessageFormatter } from "../constants/messages.js";

class OutputView {
  static printBoughtLottoNumbers(lottoNumbersArray) {
    this.#printMessage(
      outputMessageFormatter.boughtLottosCompleted(lottoNumbersArray.length)
    );

    lottoNumbersArray.forEach((lottoNumbers) =>
      this.#printMessage(outputMessageFormatter.array(lottoNumbers))
    );
  }

  static printBlankLine() {
    this.#printMessage();
  }

  static printLottoResult(rankResult, profitRate) {
    this.#printMessage(
      outputMessageFormatter.lottoResult(rankResult, profitRate)
    );
  }

  static #printMessage(...args) {
    console.log(...args);
  }
}

export default OutputView;
