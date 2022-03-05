import {
  generateNumberArray,
  getRandomInt,
  ascendingOrder,
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
    let matchedCount = 0;
    let isBonusNumberMatched = false;

    winningNumbers.main.forEach((num) => {
      if (this.numbers.includes(num)) matchedCount += 1;
    });

    if (this.numbers.includes(winningNumbers.bonus))
      isBonusNumberMatched = true;

    return { matchedCount, isBonusNumberMatched };
  }

  matchWinningNumbers(winningNumbers) {
    const { matchedCount, isBonusNumberMatched } =
      this.countMatchedNumbers(winningNumbers);

    switch (matchedCount) {
      case 6:
        return 'first';
      case 5:
        return isBonusNumberMatched ? 'second' : 'third';
      case 4:
        return 'forth';
      case 3:
        return 'fifth';
      default:
        return 'none';
    }
  }
}
