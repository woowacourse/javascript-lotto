import { BONUS, WINNING } from "../constants/constant.js";

class Lotto {
  #lottoNumbers;
  constructor(lottoNumbers) {
    this.#lottoNumbers = this.#ascendingSort(lottoNumbers);
  }

  #ascendingSort(lottoNumbers) {
    return lottoNumbers.sort((a, b) => a - b);
  }

  compareWinningNumbers(answerTable) {
    let winningCount = 0;
    let bonusCount = 0;
    this.#lottoNumbers.forEach((number) => {
      if (answerTable[number] === WINNING) {
        winningCount += 1;
      }
      if (answerTable[number] === BONUS) {
        bonusCount += 1;
      }
    });
    return { winningCount, bonusCount };
  }
}

export default Lotto;
