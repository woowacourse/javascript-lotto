import MESSAGES from "./constants/messages.js";

class OutputView {
  static printBoughtLottos(lottoNumbersArray) {
    this.#printMessage(
      `${lottoNumbersArray.length}${MESSAGES.OUTPUT.boughtLottosCompletedTail}`
    );
    const lottoNumberArrayString = lottoNumbersArray
      .map((lottoNumbers) => this.formatArrayString(lottoNumbers))
      .join("\n");

    this.#printMessage(lottoNumberArrayString);
    this.printBlankLine();
  }

  static formatArrayString(array) {
    return `[${array.join(",")}]`;
  }

  static printBlankLine() {
    this.#printMessage();
  }

  static printLottoResultIntro() {
    this.printBlankLine();
    this.#printMessage(MESSAGES.OUTPUT.lottoResultIntro);
  }

  static printLottoResult(rankCounts, profitRate) {
    this.#printMessage(MESSAGES.OUTPUT.lottoResultHorizontalLine);
    this.#printRankResult(rankCounts);
    this.#printProfitRate(profitRate);
    this.printBlankLine();
  }

  static #printRankResult(rankCounts) {
    for (let rank = 5; rank >= 1; rank--) {
      this.#printRankCount(rank, rankCounts[rank]);
    }
  }

  static #printProfitRate(profitRate) {
    this.#printMessage(
      `${MESSAGES.OUTPUT.profitRateHead}${profitRate.toFixed(1)}${
        MESSAGES.OUTPUT.profitRateTail
      }`
    );
  }

  static #printRankCount(rank, count) {
    this.#printMessage(
      `${MESSAGES.OUTPUT.rankCountHead[rank]}${count}${MESSAGES.OUTPUT.lottoUnit}`
    );
  }

  static #printMessage(...args) {
    console.log(...args);
  }
}

export default OutputView;
