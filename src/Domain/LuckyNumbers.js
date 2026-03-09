class LuckyNumbers {
  #winningLotto;
  #bonusNumber;

  constructor(winningNumbers, bonusNumber) {
    this.#winningLotto = new Lotto(winningNumbers);

    this.#validateBonusNumber(bonusNumber);
    this.#bonusNumber = bonusNumber;
  }

  #validateBonusNumber(bonusNumber) {
    const bonus = Number(bonusNumber.trim());

    if (Number.isNaN(bonus) || bonus < 1 || bonus > 45) {
      throw new Error("[ERROR] 보너스 번호는 1~45 범위의 숫자여야 합니다!");
    }
    if (this.#winningLotto.getNumbers().includes(bonus)) {
      throw new Error("[ERROR] 보너스 번호가 당첨번호와 중복됩니다!");
    }

    return bonus;
  }

  winningNumbers() { return this.#winningLotto.getNumbers(); }
  bonusNumber() { return this.#bonusNumber; }
}

export default LuckyNumbers;