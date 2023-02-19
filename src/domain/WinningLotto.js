export class WinningLotto {
  #winningLotto;
  #bonusNumber = 0;

  constructor(winningLotto, bonusNumber) {
    this.#winningLotto = winningLotto;
    this.#bonusNumber = bonusNumber;
  }

  get winningNumbers() {
    return this.#winningLotto.numbers;
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }
}
