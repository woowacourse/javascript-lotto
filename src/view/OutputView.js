import { outputMessageFormatter } from "../constants/messages.js";

class OutputView {
  static printBoughtLottoNumbers(lottoNumbersArray) {
    this.#printMessage(
      outputMessageFormatter.boughtLottosCompleted(lottoNumbersArray.length)
    );

    lottoNumbersArray.forEach((lottoNumbers) =>
      this.#printMessage(outputMessageFormatter.array(lottoNumbers))
    );
  }

  static printLottoResult(rankResult, profitRate) {
    this.#printMessage(
      outputMessageFormatter.lottoResult(rankResult, profitRate)
    );
  }

  static printBlankLine() {
    this.#printMessage();
  }

  static #printMessage(...args) {
    console.log(...args);
  }
}

export default OutputView;
