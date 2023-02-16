import { LOTTO_CONDITION } from '../constants/condition';

export default class Lotto {
  #numbers;

  constructor(lottoNumbers) {
    this.#numbers = lottoNumbers;
  }

  getCompareResult(winningNumbers, bonusNumber) {}

  getMatchCount(winningNumbers) {
    const duplicateCheck = new Set([...winningNumbers, ...this.#numbers]);

    return LOTTO_CONDITION.lottoDigits * 2 - duplicateCheck.size;
  }

  hasBonusNumber(bonusNumber) {}

  getNumbers() {
    return this.#numbers;
  }
}
