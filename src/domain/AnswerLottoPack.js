import { BONUS, WINNING } from "../constants/constant.js";

class AnswerLottoPack {
  #answerTable = {};

  constructor(winningNumbers, bonusNumber) {
    this.winningNumbers = winningNumbers;
    this.bonusNumber = bonusNumber;

    this.#generateAnswerTable(this.winningNumbers, this.bonusNumber);
  }

  #generateAnswerTable(winningNumbers, bonusNumber) {
    winningNumbers.forEach((number) => {
      this.#answerTable[number] = WINNING;
    });
    this.#answerTable[bonusNumber] = BONUS;
  }

  get answerTable() {
    return this.#answerTable;
  }
}
export default AnswerLottoPack;
