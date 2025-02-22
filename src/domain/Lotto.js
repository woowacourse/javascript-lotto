import { BONUS, WINNING } from "../constants/constant.js";

class Lotto {
  #lottoNumbers;
  #count = {
    winningCount: 0,
    bonusCount: 0,
  };

  constructor(lottoNumbers) {
    this.#lottoNumbers = this.#ascendingSort(lottoNumbers);
  }

  compareWinningNumbers(answerLotto) {
    this.#lottoNumbers.forEach((number) => {
      if (answerLotto[number] === WINNING) {
        this.#count.winningCount += 1;
      }
      if (answerLotto[number] === BONUS) {
        this.#count.bonusCount += 1;
      }
    });
    return this.#count;
  }

  #ascendingSort(lottoNumbers) {
    return [...lottoNumbers].sort((a, b) => a - b);
  }

  get lottoNumbers() {
    return [...this.#lottoNumbers];
  }
}

export default Lotto;
