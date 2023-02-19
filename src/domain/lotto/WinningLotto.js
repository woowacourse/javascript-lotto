export default class WinningLotto {
  #winningLotto;

  #bonusNumber;

  constructor(winningLotto, bonusNumber) {
    if (winningLotto.includes(bonusNumber)) {
      throw new Error('[ERROR]');
    }

    this.#winningLotto = winningLotto;
    this.#bonusNumber = bonusNumber;
  }

  compare(lottoNumbers) {
    return (
      lottoNumbers.size * 2 - new Set([...this.#winningLotto.getNumbers(), ...lottoNumbers]).size
    );
  }

  hasBonus(lottoNumbers) {
    return lottoNumbers.has(this.#bonusNumber);
  }
}
