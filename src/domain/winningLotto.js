import { validateLotto } from '../utils/validation.js';

export default class WinningLotto {
  #lotto;
  #bonusNumber;

  constructor(lotto, bonusNumber) {
    this.#lotto = lotto;

    this.#bonusNumber = bonusNumber;
  }
}
