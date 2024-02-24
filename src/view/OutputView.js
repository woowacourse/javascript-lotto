import MESSAGES from "../constants/messages.js";

class OutputView {
  static printBoughtLottoNumbers(lottoNumbersArray) {
    this.#printMessage(
      `${lottoNumbersArray.length}${MESSAGES.OUTPUT.boughtLottosCompletedTail}`
    );
    lottoNumbersArray.forEach((lottoNumbers) =>
      this.#printMessage(this.formatArrayString(lottoNumbers))
    );
  }

  static formatArrayString(array) {
    return `${MESSAGES.OUTPUT.arrayFormatHead}${array.join(
      MESSAGES.OUTPUT.arrayFormatSeparator
    )}${MESSAGES.OUTPUT.arrayFormatTail}`;
  }

  static printBlankLine() {
    this.#printMessage();
  }

  static printLottoResult(rankResult, profitRate) {
    this.#printMessage(MESSAGES.OUTPUT.lottoResultIntro);
    this.#printMessage(MESSAGES.OUTPUT.lottoResultHorizontalLine);
    this.#printRankResult(rankResult);
    this.#printProfitRate(profitRate);
    this.printBlankLine();
  }

  static #printRankResult(rankResult) {
    this.#printFifthRankCount(rankResult.fifth);
    this.#printFourthRankCount(rankResult.fourth);
    this.#printThirdRankCount(rankResult.third);
    this.#printSecondRankCount(rankResult.second);
    this.#printFirstRankCount(rankResult.first);
  }

  static #printProfitRate(profitRate) {
    this.#printMessage(
      `${MESSAGES.OUTPUT.profitRateHead}${profitRate.toFixed(1)}${
        MESSAGES.OUTPUT.profitRateTail
      }`
    );
  }

  static #printFirstRankCount(count) {
    this.#printMessage(
      `${MESSAGES.OUTPUT.firstRankCountHead}${count}${MESSAGES.OUTPUT.lottoUnit}`
    );
  }
  static #printSecondRankCount(count) {
    this.#printMessage(
      `${MESSAGES.OUTPUT.secondRankCountHead}${count}${MESSAGES.OUTPUT.lottoUnit}`
    );
  }
  static #printThirdRankCount(count) {
    this.#printMessage(
      `${MESSAGES.OUTPUT.thirdRankCountHead}${count}${MESSAGES.OUTPUT.lottoUnit}`
    );
  }
  static #printFourthRankCount(count) {
    this.#printMessage(
      `${MESSAGES.OUTPUT.fourthRankCountHead}${count}${MESSAGES.OUTPUT.lottoUnit}`
    );
  }
  static #printFifthRankCount(count) {
    this.#printMessage(
      `${MESSAGES.OUTPUT.fifthRankCountHead}${count}${MESSAGES.OUTPUT.lottoUnit}`
    );
  }

  static #printMessage(...args) {
    console.log(...args);
  }
}

export default OutputView;
