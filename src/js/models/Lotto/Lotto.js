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
    let matched = 0;
    let isBonusNumberMatched = false;

    winningNumbers.main.forEach((num) => {
      if (this.numbers.includes(num)) matched += 1;
    });

    if (this.numbers.includes(winningNumbers.bonus))
      isBonusNumberMatched = true;

    return { matched, isBonusNumberMatched };
  }

  matchWinningNumbers(winningNumbers) {
    const matchedCount = this.countMatchedNumbers(winningNumbers);
    const result = Object.entries(LOTTO.PRIZE).filter(
      ([_, { CONDITION }]) =>
        JSON.stringify(CONDITION) === JSON.stringify(matchedCount)
    )[0];

    return (result && result[0]) || null;
  }
}
