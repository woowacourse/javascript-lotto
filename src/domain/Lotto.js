import { BONUS, WINNING } from "../constants/constant.js";

class Lotto {
  #lottoNumbers;

  constructor(lottoNumbers) {
    this.#lottoNumbers = this.#ascendingSort(lottoNumbers);
  }

  compareWinningNumbers(answerLotto) {
    const count = {
      winningCount: 0,
      bonusCount: 0,
    };
    this.#lottoNumbers.forEach((number) => {
      if (answerLotto[number] === WINNING) {
        count.winningCount += 1;
      }
      if (answerLotto[number] === BONUS) {
        count.bonusCount += 1;
      }
    });
    return count;
  }

  #ascendingSort(lottoNumbers) {
    return [...lottoNumbers].sort((a, b) => a - b);
  }

  get lottoNumbers() {
    return [...this.#lottoNumbers];
  }
}

export default Lotto;
