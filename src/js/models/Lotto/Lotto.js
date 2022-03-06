import {
  generateNumberArray,
  getRandomInt,
  ascendingOrder,
  isEqual,
} from '../../utils/utils.js';
import { LOTTO } from '../../configs/contants.js';

export default class Lotto {
  numbers;

  static getLottoNumberList() {
    const completeLottoNumbers = generateNumberArray(
      LOTTO.NUMBER_RANGE.MIN,
      LOTTO.NUMBER_RANGE.MAX
    );

    return Array.from({ length: LOTTO.NUMBER_LENGTH }, () => {
      const randomIndex = getRandomInt(0, completeLottoNumbers.length - 1);

      return completeLottoNumbers.splice(randomIndex, 1)[0];
    }).sort(ascendingOrder);
  }

  constructor(manualNumbers) {
    this.numbers = manualNumbers || Lotto.getLottoNumberList();

    Object.freeze(this);
  }

  countMatchedNumbers(winningNumbers) {
    const { main, bonus } = winningNumbers;
    const matched = main.filter((num) => this.numbers.includes(num)).length;
    const isBonusNumberMatched = this.numbers.includes(bonus);

    return { matched, isBonusNumberMatched };
  }

  matchWinningNumbers(winningNumbers) {
    const matchedCount = this.countMatchedNumbers(winningNumbers);
    const result = Object.entries(LOTTO.PRIZE).filter(([_, { CONDITION }]) =>
      isEqual(CONDITION, matchedCount)
    )[0];

    return (result && result[0]) || null;
  }
}
