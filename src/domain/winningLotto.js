import { validateBonusNumber } from '../utils/validation.js';

export default class WinningLotto {
  #lotto;
  #bonusNumber;

  constructor(lotto, bonusNumber) {
    this.#lotto = lotto;
    validateBonusNumber(this.#lotto.getNumbers, bonusNumber);

    this.#bonusNumber = bonusNumber;
  }
}
