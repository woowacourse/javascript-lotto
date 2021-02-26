import { getRandomNumber } from '../utils/general.js';
import {
  LOTTO_MIN_NUMBER,
  LOTTO_MAX_NUMBER,
  LOTTO_NUMBERS_LENGTH,
  BONUS_COUNT,
  BONUS_CHECK_REQUIRED_COUNT,
} from '../constants.js';

export default class LottoTicket {
  constructor(numbers) {
    this.numbers = (numbers ?? this.createLottoNumbers()).sort((a, b) => a - b);
    this.totalMatchCount = 0;
  }

  createLottoNumbers(array = []) {
    const number = getRandomNumber({ min: LOTTO_MIN_NUMBER, max: LOTTO_MAX_NUMBER });

    if (array.length >= LOTTO_NUMBERS_LENGTH) {
      return array;
    }

    if (!array.includes(number)) {
      array.push(number);
    }

    return this.createLottoNumbers(array);
  }

  setTotalMatchCount({ winningNumbers, bonusNumber }) {
    const totalMatchCount = this.getWinningNumbersMatchCount(winningNumbers);

    this.totalMatchCount =
      totalMatchCount === BONUS_CHECK_REQUIRED_COUNT
        ? totalMatchCount + this.getBonusNumberMatchCount(bonusNumber)
        : totalMatchCount;
  }

  getWinningNumbersMatchCount(winningNumbers) {
    return this.numbers.reduce((acc, num) => acc + Number(winningNumbers.includes(num)), 0);
  }

  getBonusNumberMatchCount(bonusNumber) {
    return this.numbers.includes(bonusNumber) ? BONUS_COUNT : 0;
  }
}
