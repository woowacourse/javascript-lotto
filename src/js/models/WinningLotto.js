import { checkValidWinningNumberInput } from '../utils/Lotto/validator';
import Lotto from './Lotto';

export default class WinningLotto extends Lotto {
  #bonusNumber = null;

  get bonusNumber() {
    return this.#bonusNumber;
  }

  generate(winningNumbers, bonusNumber) {
    try {
      checkValidWinningNumberInput(winningNumbers, bonusNumber);

      this._lottoNumbers = [...winningNumbers];
      this.#bonusNumber = bonusNumber;

      return this;
    } catch (error) {
      throw new Error(error);
    }
  }
}
