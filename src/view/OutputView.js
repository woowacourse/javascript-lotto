import MESSAGES, { outputMessageFormatter } from "../constants/messages.js";

class OutputView {
  static printBoughtLottoNumbers(lottoNumbersArray) {
    this.#printMessage(
      `${lottoNumbersArray.length}${MESSAGES.OUTPUT.boughtLottosCompletedTail}`
    );

    lottoNumbersArray.forEach((lottoNumbers) =>
      this.#printMessage(outputMessageFormatter.array(lottoNumbers))
    );
  }

  static printBlankLine() {
    this.#printMessage();
  }

  static printLottoResult(rankResult, profitRate) {
    this.#printMessage(MESSAGES.OUTPUT.lottoResultIntro);
    this.#printMessage(MESSAGES.OUTPUT.lottoResultHorizontalLine);
    this.#printMessage(
      outputMessageFormatter.lottoResult(rankResult, profitRate)
    );
  }

  static #printMessage(...args) {
    console.log(...args);
  }
}

export default OutputView;
