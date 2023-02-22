class CorrectLotto {
  #winningNumbers;

  #bonusNumber;

  setWinningNumbers(winningNumbersInstance) {
    this.#winningNumbers = winningNumbersInstance.numbers;
  }

  setBonusNumber(bonusNumberInstance) {
    this.#bonusNumber = bonusNumberInstance.number;
  }

  validateLottos() {
    if (this.isDuplicateFor()) {
      throw new Error(
        '[ERROR] 당첨 번호와 보너스 번호에 중복이 존재할 수 없습니다.'
      );
    }
  }

  isDuplicateFor() {
    return this.#winningNumbers.includes(this.#bonusNumber);
  }

  get winningNumbers() {
    return this.#winningNumbers;
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }
}

export default CorrectLotto;
