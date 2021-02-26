import { getRandomNumberArray, getMatchCount } from '../utils.js';
import { LOTTO } from '../constants.js';
export default class Lotto {
  constructor(numbers) {
    this.numbers = [];

    this.setLottoNumbers(numbers);
  }

  setLottoNumbers(numbers) {
    if (!numbers) {
      const { MINIMUM_NUMBER, MAXIMUM_NUMBER, NUMBER_COUNT } = LOTTO;
      this.numbers = getRandomNumberArray(MINIMUM_NUMBER, MAXIMUM_NUMBER, NUMBER_COUNT);
    } else {
      this.numbers = numbers;
    }

    this.numbers.sort((a, b) => a - b);
  }

  getWinningRank(winningNumber, bonusNumber) {
    const matchCount = getMatchCount(winningNumber, this.numbers);

    // TODO : 조건문 줄이기
    if (matchCount === 6) {
      return 'first';
    } else if (matchCount === 5 && this.numbers.includes(bonusNumber)) {
      return 'second';
    } else if (matchCount === 5 && !this.numbers.includes(bonusNumber)) {
      return 'third';
    } else if (matchCount === 4) {
      return 'fourth';
    } else if (matchCount == 3) {
      return 'fifth';
    }

    return 'lose';
  }
}
