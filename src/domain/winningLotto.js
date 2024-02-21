import { validateBonusNumber } from '../utils/validation.js';

export default class WinningLotto {
  #lotto;
  #bonusNumber;

  constructor(lotto, bonusNumber) {
    this.#lotto = lotto;
    this.validate(bonusNumber);

    this.#bonusNumber = bonusNumber;
  }

  validate(bonusNumber) {
    validateBonusNumber(bonusNumber);
  }
}
