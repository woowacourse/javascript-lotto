import { BONUS, WINNING } from "../constants/constant.js";

class Lotto {
  #lottoNumbers;
  constructor(lottoNumbers) {
    this.#lottoNumbers = this.#ascendingSort(lottoNumbers);
  }

  #ascendingSort(lottoNumbers) {
    return lottoNumbers.sort((a, b) => a - b);
  }

  compareWinningNumbers(answerLotto) {
    let winningCount = 0;
    let bonusCount = 0;
    this.#lottoNumbers.forEach((number) => {
      if (answerLotto[number] === WINNING) {
        winningCount += 1;
      }
      if (answerLotto[number] === BONUS) {
        bonusCount += 1;
      }
    });
    return { winningCount, bonusCount };
  }

  get lottoNumbers() {
    return this.#lottoNumbers;
  }
}

export default Lotto;
