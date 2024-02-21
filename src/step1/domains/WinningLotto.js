class WinningLotto {
  #winningLotto;

  #bonusNumber;

  constructor(winningLotto, bonusNumber) {
    this.#validateDuplication(winningLotto, bonusNumber);
    this.#winningLotto = winningLotto;
    this.#validateBonusNumber(bonusNumber);
    this.#bonusNumber = bonusNumber;
  }

  #validateBonusNumber(bonusNumber) {
    const regex = /^(?:[1-9]|[1-3][0-9]|4[0-5])$/;

    if (!regex.test(bonusNumber)) {
      throw new Error("[ERROR]");
    }
  }

  #validateDuplication(winningLotto, bonusNumber) {
    const numericBonusNumber = Number(bonusNumber);
    if (winningLotto.hasNumber(numericBonusNumber)) {
      throw new Error("[ERROR]");
    }
  }

  getWinningInfo() {
    return {
      answer: this.#winningLotto.getNumbers(),
      bonusNumber: this.#bonusNumber,
    };
  }
}

export default WinningLotto;
