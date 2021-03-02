import { getRandomNumber } from '../utils/general.js';
import {
  LOTTO_MIN_NUMBER,
  LOTTO_MAX_NUMBER,
  LOTTO_NUMBERS_LENGTH,
  BONUS_COUNT,
  BONUS_CHECK_REQUIRED_COUNT,
} from '../constants/lottoRules.js';

export default class LottoTicket {
  constructor(numbers) {
    this.numbers = (numbers ?? this.createLottoNumbers()).sort((a, b) => a - b);
    this.numOfMatch = 0;
  }

  createLottoNumbers(array = []) {
    const number = getRandomNumber({ min: LOTTO_MIN_NUMBER, max: LOTTO_MAX_NUMBER });

    if (array.length === LOTTO_NUMBERS_LENGTH) {
      return array;
    }
    if (!array.includes(number)) {
      array.push(number);
    }

    return this.createLottoNumbers(array);
  }

  getNumbersMatchCount(numbers) {
    return this.numbers.reduce((acc, num) => acc + Number(numbers.includes(num)), 0);
  }

  getBonusMatchCount(bonus) {
    return this.numbers.includes(bonus) ? BONUS_COUNT : 0;
  }

  setTotalMatchCount({ numbers, bonus }) {
    const totalMatchCount = this.getNumbersMatchCount(numbers);

    this.setStates({
      numOfMatch:
        totalMatchCount === BONUS_CHECK_REQUIRED_COUNT
          ? totalMatchCount + this.getBonusMatchCount(bonus)
          : totalMatchCount,
    });
  }

  setStates({ numOfMatch }) {
    this.numOfMatch = numOfMatch;
  }
}
