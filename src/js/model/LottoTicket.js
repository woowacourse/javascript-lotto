import { getRandomNumber } from '../utils/general.js';
import {
  LOTTO_MIN_NUMBER,
  LOTTO_MAX_NUMBER,
  LOTTO_NUMBERS_LENGTH,
  BOUNS_COUNT,
  BONUS_CHECK_REQUIRED_COUNT,
} from '../constants.js';

export default class LottoTicket {
  constructor(numbers) {
    this.numbers = (numbers ?? this.createLottoNumbers()).sort((a, b) => a - b);
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

  getTotalMatchCount(winningNumber) {
    const { winningNumbers, bonusNumber } = winningNumber;
    const matchCount = this.getWinningNumbersMatchCount(winningNumbers);

    return matchCount === BONUS_CHECK_REQUIRED_COUNT
      ? matchCount + this.getBonusNumberMatchCount(bonusNumber)
      : matchCount;
  }

  getWinningNumbersMatchCount(winningNumbers) {
    return this.numbers.reduce((acc, num) => acc + Number(winningNumbers.includes(num)), 0);
  }

  getBonusNumberMatchCount(bonusNumber) {
    return this.numbers.includes(bonusNumber) ? BOUNS_COUNT : 0;
  }
}
