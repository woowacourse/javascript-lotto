import MESSAGES from "./constants/messages.js";

class ConsoleOutputView {
  static printNumberOfLotto(numberOfLotto) {
    this.#printMessage(
      `${numberOfLotto}${MESSAGES.OUTPUT.boughtLottosCompletedTail}`
    );
  }

  static printBoughtLottos(lottos) {
    const lottoNumberArrayString = this.#getLottoNumberArrayString(lottos);
    this.#printMessage(lottoNumberArrayString);
    this.printBlankLine();
  }

  static printBoughtSlicedLottos(lottos, originalNumberOfLotto) {
    ConsoleOutputView.printBoughtLottos(lottos);
    this.#printMessage(
      `${MESSAGES.OUTPUT.boughtContractedOuttroHead}${originalNumberOfLotto}${MESSAGES.OUTPUT.boughtContractedOuttroTail}`
    );
  }

  static #formatArrayString(array) {
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
    for (let rank = 5; rank >= 1; rank -= 1) {
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

  static #getLottoNumberArrayString(lottos) {
    return lottos
      .map((lotto) => {
        const sortedLotto = lotto.sort((a, b) => a - b);
        return this.#formatArrayString(sortedLotto);
      })
      .join("\n");
  }
}

export default ConsoleOutputView;
