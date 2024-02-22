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

  static #printMessage(...args) {
    console.log(...args);
  }
}

export default OutputView;
