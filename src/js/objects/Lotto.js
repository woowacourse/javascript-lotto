import { getRandomNumberArray, getMatchCount } from '../utils.js';
import { LOTTO, WINNING_RANK } from '../constants.js';

const { NUMBER_COUNT, MINIMUM_NUMBER, MAXIMUM_NUMBER } = LOTTO;
const { FIRST, SECOND, THIRD, FOURTH, FIFTH, LOSE } = WINNING_RANK;

export default class Lotto {
  constructor(numbers) {
    this.numbers = [];

    this.setLottoNumbers(numbers);
  }

  setLottoNumbers(
    numbers = getRandomNumberArray(NUMBER_COUNT, { min: MINIMUM_NUMBER, max: MAXIMUM_NUMBER })
  ) {
    this.numbers = numbers.sort((a, b) => a - b);
  }

  getWinningRank(winningNumber, bonusNumber) {
    const matchCount = getMatchCount(winningNumber, this.numbers);

    if (matchCount === 6) {
      return FIRST;
    } else if (matchCount === 5 && this.numbers.includes(bonusNumber)) {
      return SECOND;
    } else if (matchCount === 5 && !this.numbers.includes(bonusNumber)) {
      return THIRD;
    } else if (matchCount === 4) {
      return FOURTH;
    } else if (matchCount === 3) {
      return FIFTH;
    }

    return LOSE;
  }
}
