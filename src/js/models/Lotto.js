import { getRandomNumberArray, getMatchCount } from '../utils/utils.js';
import { LOTTO, VALUE } from '../constants.js';
import { getRankByMatchCount } from '../utils/lottoUtils.js';
export default class Lotto {
  constructor(numbers) {
    this.numbers = [];

    this.setLottoNumbers(numbers);
  }

  get Numbers() {
    return this.numbers;
  }

  get NumbersString() {
    return this.numbers.join(', ');
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

  isIncludeBonus(bonusNumber) {
    return this.numbers.includes(bonusNumber);
  }

  getWinningRank(winningNumber, bonusNumber) {
    const matchCount = getMatchCount(winningNumber, this.numbers);

    return matchCount === 5 && this.isIncludeBonus(bonusNumber)
      ? VALUE.RANK.SECOND
      : getRankByMatchCount(matchCount);
  }
}
