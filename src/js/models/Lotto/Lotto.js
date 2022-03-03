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

  constructor() {
    this.numbers = Lotto.getLottoNumberList();

    Object.freeze(this);
  }
}
