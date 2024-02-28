import { outputMessageFormatter } from "../constants/messages.js";

class OutputView {
  static printBoughtLottoNumbers(lottoNumbersArray) {
    this.#printMessage(`${lottoNumbersArray.length}개를 구매했습니다.`);

    lottoNumbersArray.forEach((lottoNumbers) =>
      this.#printMessage(`[${lottoNumbers.join(", ")}]`)
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
