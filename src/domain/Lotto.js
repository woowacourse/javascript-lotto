import { LOTTO_CONDITION } from '../constants/condition';

export default class Lotto {
  #numbers;

  constructor(lottoNumbers) {
    this.#numbers = lottoNumbers;
  }

  getCompareResult(winningNumbers, bonusNumber) {
    const matchCount = this.getMatchCount(winningNumbers);
    const hasBonusNumber = this.hasBonusNumber(bonusNumber);

    return { matchCount, hasBonusNumber };
  }

  getMatchCount(winningNumbers) {
    const duplicateCheck = new Set([...winningNumbers, ...this.#numbers]);

    return LOTTO_CONDITION.lottoDigits * 2 - duplicateCheck.size;
  }

  hasBonusNumber(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }

  getNumbers() {
    return this.#numbers;
  }
}
