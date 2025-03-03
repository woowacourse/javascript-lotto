import validateBonusNumber from '../validations/validate/validateBonusNumber.js';

class WinningLotto {
  #winningLotto;
  #bonusNumber;

  constructor(winningLotto, bonusNumber) {
    this.#winningLotto = winningLotto;
    this.#bonusNumber = bonusNumber;
    validateBonusNumber(this.#winningLotto, this.#bonusNumber);
  }

  get winningNumbers(){
    return this.#winningLotto.numbers;
  }

  get bonusNumber(){
    return this.#bonusNumber;
  }
}

export default WinningLotto;
