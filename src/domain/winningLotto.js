import { validateBonusNumber } from '../utils/validation.js';

export default class WinningLotto {
  #lotto;
  #bonusNumber;

  constructor(lotto, bonusNumber) {
    this.#lotto = lotto;
    this.validate(this.#lotto.getNumbers, bonusNumber);

    this.#bonusNumber = bonusNumber;
  }

  validate(numbers, bonusNumber) {
    validateBonusNumber(numbers, bonusNumber);
  }
}
