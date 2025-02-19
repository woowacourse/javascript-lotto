class AnswerLottoPack {
  #answerTable = {};

  constructor(winningNumbers, bonusNumber) {
    this.winningNumbers = winningNumbers;
    this.bonusNumber = bonusNumber;

    this.#generateAnswerTable(this.winningNumbers, this.bonusNumber);
  }

  #generateAnswerTable(winningNumbers, bonusNumber) {
    winningNumbers.forEach((number) => {
      this.#answerTable[number] = "당첨 번호";
    });
    this.#answerTable[bonusNumber] = "보너스 번호";
  }

  get answerTable() {
    return this.#answerTable;
  }
}
export default AnswerLottoPack;
